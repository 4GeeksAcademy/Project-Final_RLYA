# This file was created to run the application on heroku using gunicorn.
# Read more about it here: https://devcenter.heroku.com/articles/python-gunicorn

from app import app as application

if __name__ == "__main__":
    application.run()

# class ListaProfesionales:
#     def __init__(self):
#         self.prof=[{}]
      


# def get_all_profesionales(self):
#         return self.prof
