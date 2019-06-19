# Melodia

Melodia is a web app that invites the user to create a melody and use Google's open source machine learning project Magenta to generate new melodies. 

## Tech Stack

__Frontend:__ React, Javascript, jQuery, HTML, CSS, Bootstrap

__Backend:__ Flask, Jinja, SQL, SQL Alchemy, PostgreSQL, Python


## Features

The input melody can be of any length. Users can change the length of their melody with the add and delete note buttons.

![add-delete-demo](https://user-images.githubusercontent.com/49376684/59725012-db551980-91e0-11e9-9e97-025472a9aaee.gif)

There are twelve pitches to choose from starting at middle c and ending an octave above that.

![chromatic](https://user-images.githubusercontent.com/49376684/59725492-a9dd4d80-91e2-11e9-80fb-231885c74952.gif)

Users can play their melody by clicking on the play button

![play](https://user-images.githubusercontent.com/49376684/59727215-a1d4dc00-91e9-11e9-9ebb-fdd2be99e042.gif)

New melodies can be created by clicking on the generate melody button

![generate](https://user-images.githubusercontent.com/49376684/59727305-01cb8280-91ea-11e9-9e72-2b19b1a6d1aa.gif)


## Run Melodia Locally

### Requirements

* PostgreSQL


__Clone Repository:__
```
$ git clone https://github.com/gabgerson/music-generator
```
__Create virtual environment:__

```
$ virtualenv env
```
__Activate virtual environment:__

```
$ source env/bin/activate
```

__Install dependencies:__

```
$ pip install -r requirements.txt
```

__Create database:__

```
$ createdb music
```

__Create database tables:__

```
$ python model.py
```

__Run the app:__

```
$ python server.py
```

__Use your browser to navigate to:__

```
http://localhost:5000/
```

## TODO:

* Make recently saved melody show up on homepage, with the other saved melody buttons, when the save button is clicked
* Refactor style.css
## About the developer

Learn more here [LinkedIn](https://www.linkedin.com/in/gabriela-gerson)
