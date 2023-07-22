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
        price: number().positive().required('You must enter a positive price.'),
    })

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
        <div>

        </div>
    )
}

export default CarForm;