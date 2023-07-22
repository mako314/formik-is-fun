from models import db, Car
from flask_cors import CORS
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


migrate = Migrate(app, db)

db.init_app(app)
api = Api(app)
CORS(app)

class Cars(Resource):
    # This is our GET. We'll be using this to make sure we're getting our data, and posting succesfully.
    def get(self):
        cars = [car.to_dict() for car in Car.query.all()]

        return make_response(cars, 200)
    
    # This is our POST. We'll use it to receive the information from the frontend
    def post(self):
        # You'll need this line of code to properly capture the data in your post.
        data = request.get_json()

        # We won't do validations this time around, but if requested I can add it.
        new_car = Car(
            make = data['make'],
            model = data['model'],
            year = data['data'],
            price = data['price']
        )

        #This line actually adds our new_car to our DB.
        db.session.add(new_car)
        #The line below, commits the car to the database.
        db.session.commit()

        return make_response(new_car.to_dict(), 201)
    
api.add_resource(Cars, '/cars')

if __name__ == '__main__':
    app.run(port=5555, debug=True)