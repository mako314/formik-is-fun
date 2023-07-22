import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormComponent from './FormComponent'

function App() {
  const [cars, setCars] = useState([])

  //This fires off on page load. It fetches our data and populates our state variable. It's required because in the function below we'll be updating the list of our state variables.
  useEffect(() => {
    fetch("http://127.0.0.1:5555/cars")
      .then((resp) => resp.json())
      .then((data) => {
        setCars(data)
      })
  }, [])

  //This updates our list of cars. By doing the setter and spreading the cars and then adding one, we have an updated array list
  const addCar = (car) => {
    setCars(cars => [...cars, car])
  }

  //Map over the cars we have to display data on the homepage (our only other page)
  const mappedCars = cars.map((car) => {
    return(
    <div>
      <p>
        {car.make} {car.model} {car.year} ${car.price}
      </p>
    </div>
    )
  })

  console.log(mappedCars)


  return (
    <div className="App">
      {/* Routes is required here, otherwise you cannot have a route by itself. We take our route and make the element equal to our home page, which in this case we want it to be the form. We also pass in our mappedCars to display what's currently in our DB */}
      <Routes>
        <Route path='/' element={<FormComponent addCar={addCar}/>} />
      </Routes>
        {mappedCars}
    </div>
  );
}

export default App;
