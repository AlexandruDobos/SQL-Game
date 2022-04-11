import React, {useState} from 'react'
import {Link} from "react-router-dom"
import '../css/nav.css'
//"http://192.168.100.27/Licenta/models/DecodeJWT.php",
//"http://192.168.1.7/Licenta/models/DecodeJWT.php",

export default function Nav() {

    const pages = ['Login', 'Sign in'];

    const [state, setState] = useState({user: ""});
    const [points, setPoints] = useState({points: ""})

    function GetUserPoints() {
        const dataPoints = {
            email: state.user
        };

        const requestOptionsPoints = {
            method: "POST",
            body: JSON.stringify(dataPoints)
        };

        fetch(
            "http://192.168.100.27/Licenta/models/ExtractUserPoints.php",
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
    
    React.useEffect(() => {

        if (localStorage.getItem("token")) {
            const data = {
                jwt: localStorage.getItem("token")
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            };

            fetch(
                "http://192.168.100.27/Licenta/models/DecodeJWT.php",
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
                })
        }
    }, [])

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

    if (state.user) {
        //console.log(state.user);
        //console.log(points.points)
        buttons = (
            <ul className="navigation">
                <li id="element">
                    Points: {points.points}
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
                <Link id="element" to={'/'}>Home</Link>
                {state.user && <Link id="element" to={'/training'}>Exersează</Link>}
                {buttons}
            </nav>
        </div>
    )

}
