/*import React, {Component, useEffect} from 'react';*/

//"http://192.168.100.27/Licenta/models/DecodeJWT.php",
//"http://192.168.1.7/Licenta/models/DecodeJWT.php",
import React, {useState} from 'react';

export default function Home() {
    const [state, setState] = useState({user: ""});
    const [error, setError] = useState(false);
    React.useEffect(() => {
        if (localStorage.getItem("token")) {

            const data = {
                jwt: localStorage.getItem("token")
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data),
            };

            fetch(
                "http://192.168.100.27/Licenta/models/DecodeJWT.php",
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    setState({user: dates["JWT"]["data"]["email"]});
                })
                .catch((error) => {
                    setError(true);
                });


        }
    }, [])
    return (<div>
        {state.user && <h2>Hi, {state.user}</h2>}
        {!state.user && <h2>You are not logged in!</h2>}
        {error && <h2>Eroare la server</h2>}
    </div>)

}
