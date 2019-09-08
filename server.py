"""Music Generator"""
from jinja2 import StrictUndefined # Ask what this does docs are confusing
from flask import (Flask, request, render_template, flash, session, jsonify, redirect, g)
from flask_debugtoolbar  import DebugToolbarExtension
from model import User, SavedMusic, connect_to_db, db
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)

app.secret_key = "dabbdjdkslskdshakdfghj"

JS_TESTING_MODE = False

radio_button_info_dictionary = {

}

@app.before_request
def add_tests():
    g.jasmine_tests = JS_TESTING_MODE

@app.route("/")
def index():
    """Show homepage"""
# get email from session
    if session.get("username"):
        email = session["username"]
        # query databaste to get user_id will refactor later
        user_query= User.query.filter(User.email==email).first()
        user_id = user_query.user_id
        # get user's saved music
        user_melodies = SavedMusic.query.filter(SavedMusic.user_id==user_id).all()
        # if they have melodies send melodies with homepage
        if user_melodies != None:
            return render_template("homepage.html", user_melodies = user_melodies)

    return render_template("homepage.html")



    
@app.route("/sign-up", methods=["GET"])
def sign_up():
    """Show signup form"""

    return render_template("register.html")


@app.route("/sign-up", methods=["POST"])
def register_process():
    #get email and password from form
    email = request.form.get('email')
    password = request.form.get('password')
    # if that use is not in database add them
    if "username" in session:
        flash("Please logout")
    elif User.query.filter(User.email==email).first() == None:
        user = User(email=email, password_hash=generate_password_hash(password))
        # user.set_password(password)

        db.session.add(user)
        db.session.commit()
    else:
        #if user in database flash user already exists
        flash('This user already exists.')

    return redirect("/")


@app.route("/login")
def login():
    """Show login form"""

    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login_process():
    #get email and password from form
    email = request.form.get('email')
    password = request.form.get('password')
    #search for user in database 
    user_query = User.query.filter(User.email == email).first()
    
    #if use in database add then to session
    if user_query != None and check_password_hash(user_query.password_hash, password): 
        session["username"] = email
        session["user_id"] = user_query.user_id
        flash('Logged in')
        user_id = user_query.user_id
        return redirect("/")
    else: 
        flash('Username and password do not match.')
        return redirect("/login")

@app.route("/logout")
def logout_process():
    if "username" in session:
        session.pop("username")
    flash("Logged Out")
    return redirect("/")


@app.route("/save-melody.json", methods=["GET", "POST"])
def save_process():

    # get data from frontend
    saved_melody = request.form.get("savedMelody")
    title = request.form.get("title")
 
    # make data a string
    saved_melody = str(saved_melody)
   
    # if there is data add it to database
    if saved_melody != "None":
        user_id = session["user_id"]

        new_music = SavedMusic(user_id=user_id, music_data=saved_melody, title=title )

        db.session.add(new_music)
        db.session.commit()
    return redirect("/")

@app.route("/about")
def show_about_page():

    return render_template("about.html")

if __name__ == "__main__":

    import sys
    if sys.argv[-1] == "jstest":
        JS_TESTING_MODE = False
    # We have to set debug=True here, since it has to be True at the
    
    # point that we invoke the DebugToolbarExtension
    app.debug = False
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run()




