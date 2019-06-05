"""Music Generator"""
from jinja2 import StrictUndefined # Ask what this does docs are confusing
from flask import (Flask, request, render_template, flash, session, jsonify, redirect, g)
from flask_debugtoolbar  import DebugToolbarExtension
from model import User, SavedMusic, connect_to_db, db
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
        print(user_id)
        # get user's saved music
        user_melodies = SavedMusic.query.filter(SavedMusic.user_id==user_id).all()
        # if they have melodies send melodies with homepage
        if user_melodies != None:
            print(user_melodies)
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
    if User.query.filter(User.email==email).first() == None:
        user = User(email=email, password=password)

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
    user_query = User.query.filter(User.email == email, User.password == password).first()
    #if use in database add then to session
    if user_query != None: 
        session["username"] = email
        session["user_id"] = user_query.user_id
        print(session["username"])
        print(session["user_id"])
        flash('Logged in')
        user_id = user_query.user_id
        return redirect("/")
    else: 
        flash('Username and password do not match.')
        return redirect("/login")

@app.route("/logout")
def logout_process():

    session.pop("username")

    return redirect("/")


@app.route("/save-melody.json", methods=["GET", "POST"])
def save_process():

    # get data from frontend
    # print("LOOOOK  AT ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    saved_melody = request.form.get("savedMelody")
    title = request.form.get("title")
    print(title)
    # print(jsdata)
    # make data a string
    saved_melody = str(save_melody)
    # print(jsdata)
    print(session["username"])
    # if there is data add it to database
    if saved_melody != "None":
        email = session["username"]
        # print(email)
        user_query = User.query.filter(User.email==email).first()
        user_id = user_query.user_id
        new_music = SavedMusic(user_id=user_id, music_data=saved_melody, title=title )
        # print(new_music)
        db.session.add(new_music)
        db.session.commit()
    return redirect("/") #don't go here will add none melody to database



if __name__ == "__main__":

    import sys
    if sys.argv[-1] == "jstest":
        JS_TESTING_MODE = True
    # We have to set debug=True here, since it has to be True at the
    
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(debug=True, host='0.0.0.0')




