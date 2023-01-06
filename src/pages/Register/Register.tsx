import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
//import "./Register.css";


function Register(){


    return (
        <div className="app">
            <Navbar/>
            <RegisterForm/>
        </div>

    );
}

export default Register;