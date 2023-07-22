from app import app
from models import db, Car

if __name__ == '__main__':
    with app.app_context():
        #Clear dbs
        print("Clearing db...")
        Car.query.delete()

        print("Seeding your Car db...")
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

        db.session.add_all(cars)
        db.session.commit()
        print("Seeding completed!")
