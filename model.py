"""Models and database functions for Music Generator project."""
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

#Model definitions


class User(db.Model):
	"""User of Music Generator"""
	#instance of User stored as table 'users
	__tablename__ = 'users'

	#table columns
	user_id = db.Column(db.Integer, autoincrement=True, primary_key=True, 
						nullable=False)
	email = db.Column(db.String(64), nullable=False)
	password = db.Column(db.String(64), nullable=False)

	def __repr__(self):
		"""Provide helpful representation when printed."""

		return f'User user_id={self.user_id} email={self.email}>'
	

class SavedMusic(db.Model):
	"""File path of users creations stored here"""

	__tablename__ = 'saved_music'

	music_id = db.Column(db.Integer, autoincrement=True, primary_key=True,
						 nullable=False)
	user_id = db.Column(db.Integer, 
						db.ForeignKey('users.user_id'),
						 nullable=False)
	title = db.Column(db.String(70), nullable=False)
	music_data = db.Column(db.String, nullable=False)

	user = db.relationship('User', backref=db.backref('saved_music'))

	def __repr__(self):
		"""Provide helpful representation when printed."""


		return f'<SavedMusic user_id={self.user_id} music_id={self.music_id}>'


def example_data():


	new_user = User(email="gaglightning@gmail.com", password="password")
	new_melody = SavedMusic(user_id=1, title="This is a great title", music_data='{"notes":musafijsadlf;jsda;fisda;foi}')


def connect_to_db(app):
    """Connect the database to our Flask app."""

    # Configure to use our database.
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres:///music'
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)


if __name__ == "__main__":

	from server import app
	# init_app()
	connect_to_db(app)
	db.create_all()	
