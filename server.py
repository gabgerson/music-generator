"""Music Generator"""
from jinja2 import StrictUndefined # Ask what this does docs are confusing
from flask import (Flask, request, render_template, flash, session, jsonify)
from flask_debugtoolbar  import DebugToolbarExtension



app = Flask(__name__)

app.secret_key = 'dabbdjdkslskdshakdfghj'

@app.route('/')
def index():
    """Show homepage"""

    return render_template("homepage.html")


@app.route('/pitches.json', methods=["POST"])
def user_melody():
    """Get user melody input"""
    #get pitches from form on homepage
    pitch_one = request.form.get("pitches-one")
    pitch_two = request.form.get("pitches-two")
    pitch_three = request.form.get("pitches-three")
    pitch_four = request.form.get("pitches-four")
    pitch_five = request.form.get("pitches-five")
    pitch_six = request.form.get("pitches-six")
    pitch_sev = request.form.get("pitches-sev")
    pitch_eight = request.form.get("pitches-eight")

    #format user melody
    user_melody = {
        "notes": 
         [{"pitch": pitch_one, "startTime": 0.0, "endTime": 1.0},
          {"pitch": pitch_two, "startTime": 1.0, "endTime": 2.0},
          {"pitch": pitch_three, "startTime": 2.0, "endTime": 3.0},
          {"pitch": pitch_four, "startTime": 3.0, "endTime": 4.0},
          {"pitch": pitch_five, "startTime": 4.0, "endTime": 5.0},
          {"pitch": pitch_six, "startTime": 5.0, "endTime": 6.0},
          {"pitch": pitch_sev, "startTime": 6.0, "endTime": 7.0},
          {"pitch": pitch_eight, "startTime": 7.0, "endTime": 8.0},

         ], "totalTime": 8}

    
    return jsonify(user_melody)
    
   




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')





