import React, { useState, useEffect } from 'react';
import './App.css';

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

    </div>
  );
}

export default App;
