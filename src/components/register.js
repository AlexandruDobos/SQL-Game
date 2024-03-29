﻿import React, {useState} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import IPv4 from '../index';

export default function Register() {

    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState({message: ""});
    
    function SendEmail(email){
        console.log(email);
        const data = {
            comanda: "Confirmare email",
            email: email
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
        };
        let input = IPv4 + "/Licenta/models/SendTokenToEmail.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setErrorData({message: data.message})
                /*Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );*/
            })
            .catch((error) => {
                /*Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );*/
                console.log(error);
                setErrorData({message: "Eroare"})
            });
    }
    const data = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirm: ""
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(data);
        if (data.first_name &&
            data.last_name &&
            data.username &&
            data.email &&
            data.password &&
            data.password_confirm) {

            if (data.password === data.password_confirm) {

                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(data),
                };
                let input = IPv4 + "/Licenta/models/AddUser.php"
                fetch(
                    input,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((dates) => {
                        console.log(dates)
                        if (dates.message === "Username taken. Choose another one") {
                            setErrorData({message: "Username existent deja."});
                            /*Array.from(document.querySelectorAll("input")).forEach(
                                input => (input.value = "")
                            );*/
                        } else if (dates.message === "Email taken. Choose another one") {
                            setErrorData({message: "Email existent deja."});
                            /*Array.from(document.querySelectorAll("input")).forEach(
                                input => (input.value = "")
                            );*/
                        } else {
                            SendEmail(data.email);
                            setErrorData({message: "Verifică mailul pentru a activa contul!"});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(true);
                    });
            } else {
                setErrorData({message: "Parolele nu coincid."});
                /*Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );*/
            }
        } else {
            setErrorData({message: "Trebuiesc completate toate câmpurile."})

            /*Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );*/
        }
    }

    return (
        <form onSubmit={handleSubmit}>

            <h3>Sign up</h3>

            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" placeholder="First Name"
                       onChange={e => data.first_name = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name"
                       onChange={e => data.last_name = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Username"
                       onChange={e => data.username = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email"
                       onChange={e => data.email = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password"
                       onChange={e => data.password = e.target.value}/>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password"
                       onChange={e => data.password_confirm = e.target.value}/>
            </div>
            <div className="buttonLogin">
                <button className="btn btn-primary btn-block">Sign Up</button>
            </div>
            <div className="errorSubmit">
                {error}
                {errorData.message}
            </div>
        </form>
    );
}