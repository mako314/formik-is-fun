import React from "react";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { object, string, number} from 'yup'

function CarForm({addCar}){
    const [error, setError] = useState() //This is simply here in case one would like to do backend validations, we can incorporate this later on.
    const navigate = useNavigate()

    //This formSchema comes from yup, it's a way to require certain parts of the form to be filled. In our case, we'll use it to require a positive price, and a model.
    const formSchema = object({
        model: string().required('Please enter a model'),
        price: number().positive().required('You CANNOT include a comma, and you must enter a positive price.'),
    })

    // You need to set initial values and pass an object to formik by using useFormik ({})
    const formik = useFormik({
        initialValues: {
            make: '',
            model: '',
            year: '',
            price: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('http://127.0.0.1:5555/cars' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then(res => res.json())
                .then(car =>{
                    addCar(car)
                })       
        }
    })


    return(
        <div className="form-container">
            <form className="form" onSubmit={formik.handleSubmit}>
                <div className="signup-form">
                    {/* display errors from formik/yup */}
                    { formik.errors && Object.values(formik.errors).map(e => <p>{e}</p>) }
                    
                    <div className="submit-form"> 
                    <label>Make</label>
                    <input
                        type="text"
                        name="make"
                        value={formik.values.make}
                        onChange={formik.handleChange}
                    />
                    </div>

                    <div className="submit-form"> 
                    <label>Model</label>
                    <input
                        type="text"
                        name="model"
                        value={formik.values.model}
                        onChange={formik.handleChange}
                    />
                    </div>
                    
                    <div className="submit-form"> 
                    <label>Year</label>
                    <input
                        type="text"
                        name="year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                    />
                    </div>
                    
                    <div className="submit-form"> 
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    </div>
                </div>
                <input type='submit' className="submit-btn"/>
            </form>
        </div>
    )
}

export default CarForm;