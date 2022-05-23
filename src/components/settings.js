import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import '../css/settings.css'
import IPv4 from '../index'
import {Add} from "@mui/icons-material";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";

export default function Settings() {

    const [errorData, setErrorData] = useState({message: ""});
    const [errorPassword, setErrorPassword] = useState({message: ""})
    const [state, setState] = useState({user: ""});
    const [username, setUsername] = useState({username: ""});
    const [password, SetPassword] = useState({password: ""});
    const [userGrade, setUserGrade] = useState({grade: ""});
    const [newPassword, SetNewPassword] = useState({newPassword: ""});
    const [confirmNewPassword, ConfirmNewPassword] = useState({confirmNewPassword: ""});
    const [points, setPoints] = useState({points: ""})
    const [token, setToken] = useState({token: localStorage.getItem("token")})

    const usernameData = {
        newUsername: ""
    }

    function decodeJWT() {
        if (localStorage.getItem("token")) {
            const data = {
                jwt: localStorage.getItem("token")
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            };
            let input = IPv4 + "/Licenta/models/DecodeJWT.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    //this.props.setUser(dates.data.email);
                    setState({
                        user: dates["JWT"]["data"]["email"]
                    })
                    setPoints({
                        points: dates["JWT"]["data"]["points"]
                    })
                    setUsername({
                        username: dates["JWT"]["data"]["username"]
                    })
                    setUserGrade({
                        grade: dates["JWT"]["data"]["grade"]
                    })
                })
        }
    }

    function ChangePoints(parameter, numberOfPoints) {
        const data = {
            email: state.user,
            numberOfPoints: numberOfPoints
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        if (parameter === "add") {
            let input = IPv4 + "/Licenta/models/CreateTokenAddPoints.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('token', data.JWT);
                    window.dispatchEvent(new Event("storage"));
                })
        } else if (parameter === "decrement") {
            let input = IPv4 + "/Licenta/models/CreateTokenDecrementPoints.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('token', data.JWT);
                    window.dispatchEvent(new Event("storage"));
                })
        }

    }

    React.useEffect(() => {
        decodeJWT();

        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            //setToken({token: localStorage.getItem("token")})
            decodeJWT();
        });

    }, [token.token])

    function ChangeUsername() {
        const data = {
            email: state.user,
            newUsername: usernameData.newUsername
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        let input = IPv4 + "/Licenta/models/CreateTokenUpdateUsername.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                console.log(dates)
                if (dates.message === "Email incorect" || dates.message === "Username deja existent" || dates.message === "Nu sunt date suficiente") {
                    setErrorData({message: dates.message})
                    Array.from(document.querySelectorAll("input")).forEach(
                        input => (input.value = "")
                    );
                } else {
                    localStorage.setItem('token', dates.message);
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            });

    }

    const handleSubmitUsername = e => {
        e.preventDefault();
        if(points.points >= 500) {
            console.log(username.username)
            console.log(usernameData.newUsername)
            ChangeUsername();
            ChangePoints("decrement", 500)
            console.log(errorData.message)
        }else{
            setErrorData({message: "Nu ai puncte suficiente"})
        }
    }

    function changePassword() {
        const data = {
            email: state.user,
            password: password.password,
            newPassword: newPassword.newPassword
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        let input = IPv4 + "/Licenta/models/UpdatePassword.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                console.log(dates)
                setErrorPassword({message: dates.message})
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            })
            .catch((error) => {
                console.log(error);
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            });

    }

    const handleSubmitChangePassword = e => {
        e.preventDefault();
        console.log(password.password);
        console.log(newPassword.newPassword);
        console.log(confirmNewPassword.confirmNewPassword)
        if (!password.password || !newPassword.newPassword || !confirmNewPassword.confirmNewPassword) {
            setErrorPassword({message: "Date insuficiente"})
        } else {
            if (newPassword.newPassword !== confirmNewPassword.confirmNewPassword) {
                setErrorPassword({message: "Noile parole nu coincid."})
            } else {
                if (password.password === newPassword.newPassword) {
                    setErrorPassword({message: "Parolele trebuie sa difere."})
                } else {
                    changePassword();
                }
            }
        }
    }
    
    return (
        <div>
            <h2 id="h2Title">{username.username} Settings Page</h2>
            <div className="formulary">
                <div id="formularyChild">
                    <p id="title">Your email</p>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label={state.user}
                    />
                </div>
                <div id="formularyChild">
                    <p id="title">Your grade</p>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label={userGrade.grade}
                    InputProps={{
                        inputProps: {
                            style: {textAlign: "center"},
                        }
                    }}
                />
                </div>
                <div id="formularyChild">
                    <p id="title">Your points</p>
                    <TextField

                        disabled
                        id="outlined-disabled"
                        label={points.points}
                        InputProps={{
                            inputProps: {
                                style: {textAlign: "center"},
                            }
                        }}
                    />
                </div>
                <div id="formularyChild">
                    <form onSubmit={handleSubmitUsername}>
                        <p id="title">Username</p>
                        <div id="childChangeDetails">
                            <div>
                                <TextField
                                    id="standard-required"
                                    label={username.username}
                                    variant="standard"
                                    onChange={e => usernameData.newUsername = e.target.value}
                                />
                            </div>
                            <div className="buttonLogin" id="childChangeDetails">
                                <button className="btn btn-primary btn-block">Change for 500 <MonetizationOnIcon/></button>
                            </div>
                            <div className="errorSubmit">
                                {errorData.message}
                            </div>
                        </div>
                    </form>
                </div>
                <div id="formularyChild">
                    <form onSubmit={handleSubmitChangePassword}>
                        <p id="title">Change Password</p>
                        <div className="changePasswordClass">
                            <TextField
                                id="standard-password-input1"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                helperText="Write current password"
                                variant="standard"
                                onChange={e => password.password = e.target.value}
                            />

                            <TextField
                                id="standard-password-input2"
                                label="New Password"
                                type="password"
                                autoComplete="current-password"
                                helperText="Write new password"
                                variant="standard"
                                onChange={e => newPassword.newPassword = e.target.value}
                            />
                            <TextField
                                id="standard-password-input3"
                                label="Confirm New Password"
                                type="password"
                                autoComplete="current-password"
                                helperText="Rewrite new password"
                                variant="standard"
                                onChange={e => confirmNewPassword.confirmNewPassword = e.target.value}
                            />
                        </div>
                        <div className="buttonLogin" id="childChangeDetails">
                            <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                        <div className="errorSubmit">
                            {errorPassword.message}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
