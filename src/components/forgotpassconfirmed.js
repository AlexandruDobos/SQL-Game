import React, {Component, useState} from "react";
import IPv4 from '../index.js'

export default function ForgotPassConfirmed() {

    const [newPassword, setNewPassword] = useState({password: ""});
    const [confirmNewPassword, setConfirmNewPassword] = useState({password: ""});
    const [errorData, setErrorData] = useState({message: ""});

    const handleSubmit = e => {
        e.preventDefault();
        if (newPassword.password !== confirmNewPassword.password) {
            setErrorData({message: "Parolele nu coincid!"});
        } else {
            if (newPassword.password === "" || confirmNewPassword.password === "") {
                setErrorData({message: "Ambele câmpuri trebuiesc completate!"});
            } else {
                const queryParams = new URLSearchParams(window.location.search);
                const email = queryParams.get("email");

                const data = {
                    email: email,
                    newPassword: newPassword.password
                }
                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(data),
                };
                let input = IPv4 + "/Licenta/models/ForgotPassword.php"
                fetch(
                    input,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.message === "Parola actualizata.") {
                            window.location.href = '/login';
                        } else {
                            setErrorData({message: data.message})
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setErrorData({message: "Eroare"})
                    });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Parolă noua</h3>

            <div className="form-group">
                <div className="form-group">
                    <label>Parola nouă</label>
                    <input type="password" className="form-control" placeholder="Password"
                           onChange={e => setNewPassword({password: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Confirmă parola nouă</label>
                    <input type="password" className="form-control" placeholder="Confirm Password"
                           onChange={e => setConfirmNewPassword({password: e.target.value})}/>
                </div>
            </div>
            <button className="btn btn-primary btn-block">Submit</button>
            <div className="errorLogin">
                {errorData.message}
            </div>
        </form>
    )
}