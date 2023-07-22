import React, { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './FormComponent'

function App() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/equipment")
      .then((resp) => resp.json())
      .then((data) => {
        setCars(data)
      })
  }, [])

  const addCar = (car) => {
    setCars(cars => [...cars, car])
  }


  return (
    <div className="App">
        <Route path='/' element={<FormComponent addCar={addCar}/>} />
    </div>
  );
}

export default App;
