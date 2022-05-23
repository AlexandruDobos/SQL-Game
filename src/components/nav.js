﻿import React, {useState} from 'react'
import {Link} from "react-router-dom"
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MailIcon from '@mui/icons-material/Mail';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import '../css/nav.css'
import IPv4 from '../index';
import {Badge} from "@mui/icons-material";


export default function Nav() {

    const pages = ['Login', 'Sign in'];

    const [isAdmin, setIsAdmin] = useState({isAdmin: ""})
    const [state, setState] = useState({user: ""});
    const [username, setUsername] = useState({username: ""})
    const [points, setPoints] = useState({points: ""})
    const [token, setToken] = useState({token: localStorage.getItem("token")})
    const [challenges, setChallenges] = useState({value: 0})

    function GetUserPoints() {
        const dataPoints = {
            email: state.user
        };

        const requestOptionsPoints = {
            method: "POST",
            body: JSON.stringify(dataPoints)
        };
        let input = IPv4 + "/Licenta/models/ExtractUserPoints.php"
        fetch(
            input,
            requestOptionsPoints
        )
            .then((response) => response.json())
            .then((dates) => {
                //this.props.setUser(dates.data.email);
                setPoints({
                    points: dates.message
                })
            });
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
                    setIsAdmin({
                        isAdmin: dates["JWT"]["data"]["is_admin"]
                    })
                    setUsername({
                        username: dates["JWT"]["data"]["username"]
                    })
                    //GetNumberOfChallenges(dates["JWT"]["data"]["username"]);
                })
        }
    }
    
    function GetNumberOfChallenges(username){
        const data = {
            username: username
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        
        let input = IPv4 + "/Licenta/models/GetNumberOfChallenges.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if(data.message !== "Actiune esuata!" && data.message !== "Actiune esuata! Nu sunt date suficiente!") {
                    setChallenges({value: data.message})
                }
            })
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

    /*    React.useEffect(() => {
            if(state.user) {
                GetUserPoints();
            }
        },[state])*/

    const handleLogout = () => {
        localStorage.clear();
        setState({user: ""});
        window.location.reload();
    };
    let buttons;

    if (state.user && isAdmin.isAdmin==="1") {
        //console.log(state.user);
        //console.log(points.points)
        console.log(isAdmin.isAdmin)
        buttons = (
            <ul className="navigation">
                <li id="element">
                    <MonetizationOnIcon/>Points: {points.points}
                </li>
                <li>
                    <Link id="element" to={'/challenges'}><MailIcon /></Link>
                </li>
                <li>
                    <Link id="element" to={'/addquestion'}><AddCircleOutlineIcon/></Link>
                </li>
                <li>
                    <Link id="element" to={'/settings'}><SettingsIcon/></Link>
                </li>
                <li>
                    <Link id="element" to={'/admin'}><AdminPanelSettingsIcon/></Link>
                </li>
                <li>
                    <Link id="element" to={'/'} onClick={handleLogout}>Logout<LogoutIcon/></Link>
                </li>
            </ul>
        )
    } else if (state.user) {
        //console.log(state.user);
        //console.log(points.points)
        buttons = (
            <ul className="navigation">
                <li id="element">
                    Points: {points.points}
                </li>
                <li>
                    <Link id="element" to={'/challenges'}><MailIcon /></Link>
                </li>
                <li>
                    <Link id="element" to={'/addquestion'}><AddCircleOutlineIcon/></Link>
                </li>
                <li>
                    <Link id="element" to={'/settings'}><SettingsIcon/></Link>
                </li>
                <li>
                    <Link id="element" to={'/'} onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        )
    } else {
        buttons = (
            <ul className="navigation">
                <li>
                    <Link id="element" to={'/login'}>Login</Link>
                </li>
                <li>
                    <Link id="element" to={'/register'}>Sign up</Link>
                </li>
            </ul>
        )
    }

    return (
        <div className="cont">
            <nav className="navigation">
                <Link id="element" to={'/'}>Home <HomeIcon/></Link>
                {state.user && <Link id="element" to={'/training'}>Exersează <AlarmOnIcon/></Link>}
                {state.user && <Link id="element" to={'/game'}>Joacă <FireplaceIcon/></Link>}
                {buttons}
            </nav>
        </div>
    )

}
