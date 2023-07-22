import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate, Route, Routes } from 'react-router-dom';
import FormComponent from './FormComponent'

function App() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/cars")
      .then((resp) => resp.json())
      .then((data) => {
        setCars(data)
      })
  }, [])

  const addCar = (car) => {
    setCars(cars => [...cars, car])
  }

  const mappedCars = cars.map((car) => {
    <div>
      <p>
        {car.make}
      </p>
      <p>
        {car.model}
      </p>
      <p>
        {car.year}
      </p>
      <p>
        ${car.price}
      </p>
    </div>
  })


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FormComponent addCar={addCar}/>} />
      </Routes>
        {mappedCars}
    </div>
  );
}

export default App;
