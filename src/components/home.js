/*import React, {Component, useEffect} from 'react';*/

import IPv4 from '../index'
import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";

export default function Home() {
    const [state, setState] = useState({user: ""});
    const [error, setError] = useState(false);
    const [firstUsers, setFirstUsers] = useState([])
    const [JWT, setJWT] = useState({setJWT: false});
    const [rows, setRows] = useState([])
    let columns = [
        {
            field: 'email',
            headerName: 'User',
            description: 'Emailul utilizatorului',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'points',
            headerName: 'Points',
            description: 'Punctele utilizatorului',
            sortable: false,
            editable: false,
            width: 160,
        }];

    function getDetails(){
        const requestOptionsForUsers = {
            method: "GET"
        };
        let inputForUsers = IPv4 + "/Licenta/models/CreateTokenWithDetails.php"
        fetch(
            inputForUsers,
            requestOptionsForUsers
        )
            .then((response) => response.json())
            .then((dates) => {
                localStorage.setItem('details', dates.message)
                setJWT({JWT: true});
                window.dispatchEvent(new Event("storage"));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function decodeJWTToken() {
        const data = {
            jwt: localStorage.getItem("token")
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
        };

        let input = IPv4 + "/Licenta/models/DecodeJWT.php"
        fetch(
            input,
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

    function decodeJWTDetails() {
        const data = {
            jwt: localStorage.getItem("details")
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
        };

        let input = IPv4 + "/Licenta/models/DecodeJWT.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                console.log(dates)
                console.log(dates["JWT"]["data"]["firstUsers"]);
                setFirstUsers(dates["JWT"]["data"]["firstUsers"]);
                setRows(dates["JWT"]["data"]["firstUsers"]);
            })
            .catch((error) => {
                setError(true);
            });
    }

    React.useEffect(() => {
        getDetails();
        if (localStorage.getItem("token")) {
            decodeJWTToken();
        }
        if (localStorage.getItem("details")) {
            decodeJWTDetails();
        }
        
    }, [])
    
    
    return (
        <div>
            {state.user && <h2>Hi, {state.user}</h2>}
            {!state.user && <h2>You are not logged in!</h2>}
            {error && <h2>Eroare la server</h2>}
            {state.user && 
            <div style={{ height: 400, width: '25%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                />
            </div>}
            
        </div>
    )

}
            
