from app import app
from models import Car

if __name__ == '__main__':
    with app.app_context():
        #Clear dbs
        print("Clearing db...")
        Car.query.delete()

        cars = [
            Car(
                make = "Ford",
                model = "F150",
                year = 2005,
                price = 5000
            ),
            Car(
                make = "Toyota",
                model = "Camry",
                year = 2012,
                price = 7500
            ),
            Car(
                make= "Nissan",
                model= "Altima",
                year= 2020,
                price = 15000
            )
        ]
    # make = db.Column(db.String)
    # model = db.Column(db.Integer)
    # year = db.Column(db.String)
    # price = db.Column(db.String)