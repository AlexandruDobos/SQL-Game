import React, {Component, useState} from "react";
import IPv4 from '../index.js'

export default function Forgot() {

    const [email, setEmail] = useState({email: ""});
    const [errorData, setErrorData] = useState({message: ""});
    const handleSubmit = e => {
        e.preventDefault();
        if (email.email === "") {
            setErrorData({message: "Câmpul nu are voie să fie gol!"})
        } else {
            const data = {
                comanda: "Schimbare parola",
                email: email.email
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
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = "")
                    );
                })
                .catch((error) => {
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = "")
                    );
                    console.log(error);
                    setErrorData({message: "Eroare"})
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Parolă uitată</h3>
            <p>Introdu adresa de email si accesează link-ul din mail pentru a reseta parola.</p>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Scrie adresa de email"
                       onChange={e => setEmail({email: e.target.value})}/>
            </div>
            <div className="buttonLogin">
                <button className="btn btn-primary btn-block">Submit</button>
            </div>
            <div className="errorLogin">
                {errorData.message}
            </div>
        </form>
    )
}