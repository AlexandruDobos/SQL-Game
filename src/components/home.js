/*import React, {Component, useEffect} from 'react';*/

import IPv4 from '../index'
import React, {useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import {Paper, Popper} from "@mui/material";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import {isOverflown} from "@mui/x-data-grid/utils/domUtils";
import '../css/home.css';

export default function Home() {
    const [state, setState] = useState({user: ""});
    const [username, setUsername] = useState({user: ""})
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
            renderCell: renderCellExpand,
        },
        {
            field: 'points',
            headerName: 'Points',
            description: 'Punctele utilizatorului',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        }];

    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const {width, value} = props;
        const wrapper = React.useRef(null);
        const cellDiv = React.useRef(null);
        const cellValue = React.useRef(null);
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [showFullCell, setShowFullCell] = React.useState(false);
        const [showPopper, setShowPopper] = React.useState(false);

        const handleMouseEnter = () => {
            const isCurrentlyOverflown = isOverflown(cellValue.current);
            setShowPopper(isCurrentlyOverflown);
            setAnchorEl(cellDiv.current);
            setShowFullCell(true);
        };

        const handleMouseLeave = () => {
            setShowFullCell(false);
        };

        React.useEffect(() => {
            if (!showFullCell) {
                return undefined;
            }

            function handleKeyDown(nativeEvent) {
                // IE11, Edge (prior to using Bink?) use 'Esc'
                if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                    setShowFullCell(false);
                }
            }

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [setShowFullCell, showFullCell]);

        return (
            <Box
                ref={wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    alignItems: 'center',
                    lineHeight: '24px',
                    width: 1,
                    height: 1,
                    position: 'relative',
                    display: 'flex',
                }}
            >
                <Box
                    ref={cellDiv}
                    sx={{
                        height: 1,
                        width,
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                    }}
                />
                <Box
                    ref={cellValue}
                    sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                >
                    {value}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{width, marginLeft: -17}}
                    >
                        <Paper
                            elevation={1}
                            style={{minHeight: wrapper.current.offsetHeight - 3}}
                        >
                            <Typography variant="body2" style={{padding: 8}}>
                                {value}
                            </Typography>
                        </Paper>
                    </Popper>
                )}
            </Box>
        );
    });

    GridCellExpand.propTypes = {
        value: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
    };

    function renderCellExpand(params) {
        return (
            <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth}/>
        );
    }

    function getDetails() {
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
                setUsername({user: dates["JWT"]["data"]["username"]});
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

    const handleButtonLogin = e => {
        window.location.href = '/login';
    }

    const handleButtonSignUp = e =>{
        window.location.href = '/register';
    }
    return (
        <div>
            {!state.user && <h2>Bună! Loghează-te pentru a folosi aplicația!</h2>}
            {state.user && <h2>Bună, {username.user}</h2>}
            {error && <h2>Eroare la server</h2>}
            <div className = "head">
                <div className="topContent">
                    <div id="elemTopContent">
                        <p className="a">Ai aici topul celor mai buni utilizatori de pe site!</p>
                    </div>
                    <div id="elemTopContent">
                        <p className="b">Nu te lăsa mai prejos, întrece-i și bucură-te de această experiență
                            plăcută!</p>
                    </div>
                    {!state.user &&
                    <div id="elemTopContent">
                        <div className="buttonLogin">
                            <button className="btn btn-primary btn-block" onClick={handleButtonLogin}>Loghează-te!</button>
                        </div>
                    </div>}
                    {!state.user &&
                    <div id="elemTopContent">
                        <div className="buttonLogin">
                            <button className="btn btn-primary btn-block" onClick={handleButtonSignUp}>Crează-ți cont!</button>
                        </div>
                    </div>}
                    
                </div>
                <div className="centerContent">
                    <div style={{height: 400, width: '55%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </div>
                </div>
            </div>

        </div>
    )

}
            
