import unittest

from server import app
from model import db, example_data, connect_to_db


class MusicTests(unittest.TestCase):
    """Tests Music Generator."""

    def setUp(self):
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        result = self.client.get("/")
        self.assertIn(b"Choose Some Notes", result.data)

    def test_sign_up(self):
        result = self.client.get("/sign-up")
        self.assertIn(b"Sign Up", result.data)

    def test_login(self):
        result = self.client.get("/login")
        self.assertIn(b"Login", result.data)


    # def test_rsvp(self):
    #     result = self.client.post("/rsvp",
    #                               data={'name': "Jane", 'email': "jane@jane.com"},
    #                               follow_redirects=True)
    #     self.assertIn(b"Yay!", result.data)
    #     self.assertIn(b"Party Details", result.data)
    #     self.assertNotIn(b"Please RSVP", result.data)


# class MusicTestsDatabase(unittest.TestCase):
#     """Flask tests that use the database."""

#     def setUp(self):
#         """Stuff to do before every test."""
#         # Get the Flask test client
#         self.client = app.test_client()

#         # Show Flask errors that happen during tests
#         app.config['TESTING'] = True

#         # Connect to test database
#         connect_to_db(app, "postgresql:///testdb")

#         # Create tables and add sample data
#         db.create_all()
#         example_data()

#     def tearDown(self):
#         """Do at end of every test."""

#         db.session.close()
#         db.drop_all()



if __name__ == "__main__":
    unittest.main()
