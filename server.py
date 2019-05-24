"""Music Generator"""
from jinja2 import StrictUndefined # Ask what this does docs are confusing
from flask import (Flask, request, render_template, flash, session, jsonify, redirect)
from flask_debugtoolbar  import DebugToolbarExtension
from model import User, SavedMusic, connect_to_db, db
app = Flask(__name__)

app.secret_key = "dabbdjdkslskdshakdfghj"

@app.route("/")
def index():
    """Show homepage"""

    if session.get("username"):
        email = session["username"]
        user_query= User.query.filter(User.email==email).first()
        user_id = user_query.user_id
        print(user_id)
        user_melodies = SavedMusic.query.filter(SavedMusic.user_id==user_id).all()
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

    email = request.form.get('email')
    password = request.form.get('password')

    if User.query.filter(User.email==email).first() == None:
        user = User(email=email, password=password)

        db.session.add(user)
        db.session.commit()
    else:
        flash('This user already exists.')

    return redirect("/")


@app.route("/login")
def login():
    """Show login form"""

    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login_process():

    email = request.form.get('email')
    password = request.form.get('password')

    user_query = User.query.filter(User.email == email, User.password == password).first()

    if user_query != None: 
        session["username"] = email
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
    print("LOOOOK  AT ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    jsdata = request.form.get("j")
    print(jsdata)
    jsdata = str(jsdata)
    print(jsdata)
    if jsdata != "None":
        email = session["username"]
        user_query = User.query.filter(User.email == email).first()
        user_id = user_query.user_id
        new_music = SavedMusic(user_id = user_id, music_data = jsdata)
        print(new_music)
        db.session.add(new_music)
        db.session.commit()
    return jsonify(jsdata) #don't go here will add none melody to database



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(debug=True, host='0.0.0.0')




