import React from 'react';
import './App.css';
import FormComponent from './FormComponent'


function App() {

    

  return (
    <div className="App">
      
      <Route path='/' element={<FormComponent addCar={addCar}/>} />

    </div>
  );
}

export default App;
