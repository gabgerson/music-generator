"""Music Generator"""
from jinja2 import StrictUndefined # Ask what this does docs are confusing
from flask import (Flask, request, render_template, flash, session, jsonify, redirect)
from flask_debugtoolbar  import DebugToolbarExtension
from model import User, SavedMusic, connect_to_db, db
from urllib.request import urlopen

app = Flask(__name__)

app.secret_key = "dabbdjdkslskdshakdfghj"

@app.route("/")
def index():
    """Show homepage"""

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
        return redirect("/users/" + str(user_id))
        return redirect("/")
    else: 
        flash('Username and password do not match.')
        return redirect("/login")

@app.route("/save-melody.json", methods=["GET", "POST"])
def save_process():
    print("LOOOOK  AT ME !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    jsdata = request.form.get("j")
    print(jsdata)
    jsdata = str(jsdata)
    print(jsdata)
    # session["music_data"] = jdata
    email = session["username"]
    user_query = User.query.filter(User.email == email).first()
    user_id = user_query.user_id
    new_music = SavedMusic(user_id = user_id, music_data = jsdata)
    print(new_music)
    db.session.add(new_music)
    db.session.commit()
    # flash("Good Job Gaby")

    return jsonify(jsdata)


@app.route("/save-melody.json", methods=["GET"])
def fun():
    print("I AM RUNNINGNGNGNGNG!!!!!!!!!!!!!!")
    email = session["username"]
    user_query = User.query.filter(User.email == email, User.password == password).first()
    user_id = user_query.user_id
    new_music = SavedMusic(user_id = user_id, music_data = jsdata )
    # print(new_music)
    db.session.add(new_music)
    db.session.commit()
    return redirect("/")
    # pass
# @app.route('/pitches.json', methods=["POST"])
# def user_melody():
#     """Get user melody input"""
#     #get pitches from form on homepage
#     pitch_one = request.form.get("pitches-one")
#     pitch_two = request.form.get("pitches-two")
#     pitch_three = request.form.get("pitches-three")
#     pitch_four = request.form.get("pitches-four")
#     pitch_five = request.form.get("pitches-five")
#     pitch_six = request.form.get("pitches-six")
#     pitch_sev = request.form.get("pitches-sev")
#     pitch_eight = request.form.get("pitches-eight")

#     #format user melody
#     user_melody = {
#         "notes": 
#          [{"pitch": pitch_one, "startTime": 0.0, "endTime": 1.0},
#           {"pitch": pitch_two, "startTime": 1.0, "endTime": 2.0},
#           {"pitch": pitch_three, "startTime": 2.0, "endTime": 3.0},
#           {"pitch": pitch_four, "startTime": 3.0, "endTime": 4.0},
#           {"pitch": pitch_five, "startTime": 4.0, "endTime": 5.0},
#           {"pitch": pitch_six, "startTime": 5.0, "endTime": 6.0},
#           {"pitch": pitch_sev, "startTime": 6.0, "endTime": 7.0},
#           {"pitch": pitch_eight, "startTime": 7.0, "endTime": 8.0},

#          ], "totalTime": 8}

    
#     return jsonify(user_melody)
    
   



if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run(debug=True, host='0.0.0.0')