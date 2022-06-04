import React, {useState} from 'react';
import '../css/login.css'
//"http://192.168.100.27/Licenta/models/LoginUser.php",
//"http://192.168.1.7/Licenta/models/LoginUser.php",
import IPv4 from '../index';

export default function Login() {

    const [state, setState] = useState({loggedIn: false});
    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState({message: ""});

    const data = {
        email: "",
        password: ""
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(data);
        if (data.email && data.password) {
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data),
            };
            let input = IPv4 + "/Licenta/models/LoginUser.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Email sau parola gresita.") {
                        setErrorData({message: "Date invalide."})
                        Array.from(document.querySelectorAll("input")).forEach(
                            input => (input.value = "")
                        );
                    } else if (data.message === "Unable to log user, need more data.") {
                        setErrorData({message: "Date invalide."})
                        Array.from(document.querySelectorAll("input")).forEach(
                            input => (input.value = "")
                        );
                    } else {
                        localStorage.setItem('token', data.JWT);
                        setState({
                            loggedIn: true
                        });
                        window.location.href = '/';
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setError(true);
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = "")
                    );
                    setErrorData({message: "Date invalide."})
                });
        } else {
            data.email = "";
            data.password = "";
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
            setErrorData({message: "Date invalide."})
        }

    }

    return (
        <div className="formLogin">
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>
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

                <div className="buttonLogin">
                    <button className="btn btn-primary btn-block">Submit</button>
                </div>
                {/*       <p className="forgot-password text-right">
                <Link to={'/forgot'}>Forgot password?</Link>
            </p>*/}

                <div className="errorLogin">
                    {error}
                    {errorData.message}
                </div>
            </form>
        </div>
    )
}
