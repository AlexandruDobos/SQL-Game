import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../css/admin.css'
import IPv4 from '../index.js'
import {FormControl, FormControlLabel, Paper, Popper, Radio, RadioGroup, TextareaAutosize} from "@mui/material";
import {Email} from "@mui/icons-material";
import {DataGrid} from '@mui/x-data-grid';
import PropTypes from "prop-types";

export default function Admin() {

    const [questions, setQuestions] = useState([])
    const [id, setId] = useState({id: ""})
    const [errorData, setErrorData] = useState({message: ""});
    const [usersNumber, setUsersNumber] = useState({number: ""})
    const [userEmail, setUserEmail] = useState({email: ""})
    const [username, setUsername] = useState({name: ""})
    const [userGrade, setUserGrade] = useState({grade: ""})
    const [newAdministratorRequest, setNewAdministratorRequest] = useState({name: ""})
    const [newAdministratorRequestSpecifications, setNewAdministratorRequestSpecifications] = useState({message: ""})
    const [emailUserQuestionAccepted, setEmailUserQuestionAccepted] = useState({email: ""})
    const [questionPoints, setQuestionPoints] = useState({points: 50})
    const [rows, setRows] = useState([])
    let columns = [
        {
            field: 'id',
            headerName: 'Question ID',
            description: 'Id-ul intrebarii',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'question',
            headerName: 'Question',
            description: 'Intrebarea propusa de utilizator',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'difficulty',
            headerName: 'Dificultate',
            description: 'Ce tip de dificultate are intrebarea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'var1',
            headerName: 'var_1',
            description: 'Prima varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'var2',
            headerName: 'var_2',
            description: 'A doua varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'var3',
            headerName: 'var_3',
            description: 'A treia varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'var4',
            headerName: 'var_4',
            description: 'A patra varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'varcorrect',
            headerName: 'correct_answer',
            description: 'Varianta corecta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'user',
            headerName: 'user',
            description: 'Numele utilizatorului ce a propus intrebarea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'email',
            headerName: 'email',
            description: 'Emailul utilizatorului ce a propus intrebarea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'acceptQuestion',
            headerName: 'Accepta',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'ACCEPT',
            renderCell: renderCellExpand,
        },
        {
            field: 'deleteQuestion',
            headerName: 'Sterge',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'DELETE',
            renderCell: renderCellExpand,
        },
    ];
    const [pendingAdministratorRows, setPendingAdministratorRows] = useState([])
    let administratorRequestColumns = [
        {
            field: 'id',
            headerName: 'ID',
            description: 'Ce id are cererea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'username',
            headerName: 'Username',
            description: 'Username propus',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'email',
            headerName: 'Email',
            description: 'Emailul celui propus',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'who_proposed_username',
            headerName: 'Username propunător',
            description: 'Usernameul celui ce a propus ',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'who_proposed_email',
            headerName: 'Email propunător',
            description: 'Emailul celui ce a propus ',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'specifications',
            headerName: 'Specificatii',
            description: 'Detalii despre propunere',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'acceptRequestAdministrator',
            headerName: 'Accepta',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'ACCEPT',
            renderCell: renderCellExpand,
        },
        {
            field: 'deleteRequestAdministrator',
            headerName: 'Respinge',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'DELETE',
            renderCell: renderCellExpand,
        },
    ]
    
    const [pendingResponsesRows, setPendingResponsesRows] = useState([]);
    let pendingResponsesColumns = [
        {
            field: 'id',
            headerName: 'ID',
            description: 'Ce id are răspunsul greșit',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'question_id',
            headerName: 'ID-ul întrebării',
            description: 'Ce id are întrebarea la care s-a acordat răspunsul',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'question',
            headerName: 'Întrebarea',
            description: 'Întrebarea la care s-a acordat răspunsul',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'response',
            headerName: 'Răspuns greșit',
            description: 'Răspunsul greșit al utilizatorului',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'difficulty',
            headerName: 'Dificultate întrebare',
            description: 'Ce dificultate are întrebarea pentru care este posibil ca acest răspuns să fie acceptat',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'acceptPendingResponse',
            headerName: 'Accepta răspuns',
            description: 'Acceptă acest răspuns ca fiind unul greșit pentru întrebare.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'Acceptă',
            renderCell: renderCellExpand,
        },
        {
            field: 'deletePendingResponse',
            headerName: 'Respinge răspuns',
            description: 'Șterge acest răspuns.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'Respinge',
            renderCell: renderCellExpand,
        },
    ]

    function isOverflown(element) {
        return (
            element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth
        );
    }

    const GridCellExpand = React.memo(function GridCellExpand(props) {
        const { width, value } = props;
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
                    sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {value}
                </Box>
                {showPopper && (
                    <Popper
                        open={showFullCell && anchorEl !== null}
                        anchorEl={anchorEl}
                        style={{ width, marginLeft: -17 }}
                    >
                        <Paper
                            elevation={1}
                            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                        >
                            <Typography variant="body2" style={{ padding: 8 }}>
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
            <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
        );
    }
    
    function getData() {
        const data = {
            jwt: localStorage.getItem("details")
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
                setUsersNumber({
                    number: dates["JWT"]["data"]["numberOfUsers"]
                })
            })
    }

    function getUserDetails() {
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
                setUserGrade({
                    grade: dates["JWT"]["data"]["grade"]
                })
                setUserEmail({
                    email: dates["JWT"]["data"]["email"]
                })
                setUsername({
                    name: dates["JWT"]["data"]["username"]
                })
            })
    }
    
    function GetPendingResponses(){
        const requestOptions = {
            method: "GET"
        };
        let input = IPv4 + "/Licenta/models/SelectPendingResponses.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setPendingResponsesRows(data.message);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function getPendingAdministratorRows(){
        const requestOptions = {
            method: "GET"
        };
        let input = IPv4 + "/Licenta/models/SelectPendingAdministratorRequests.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                //if (!(dates.message === "Nu exista intrebari in asteptare.")) {
                setPendingAdministratorRows(dates.message);
                //}
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getData();
        getUserDetails();
        getPendingAdministratorRows();
        GetPendingResponses();
        const requestOptions = {
            method: "GET"
        };
        let input = IPv4 + "/Licenta/models/SelectPendingTrainingQuestions.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                //if (!(dates.message === "Nu exista intrebari in asteptare.")) {
                setQuestions(dates.message);
                setRows(dates.message);
                //}
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(questions)
        questions.map((item) => console.log(item[0], item[1]))

    }

    function sendAddAdmin() {
        const data = {
            username: newAdministratorRequest.name,
            who_proposed_username: username.name,
            who_proposed_email: userEmail.email,
            specifications: newAdministratorRequestSpecifications.message
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        let input = IPv4 + "/Licenta/models/AddNewAdministratorRequest.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                //this.props.setUser(dates.data.email);
                setErrorData({message: dates.message})
                setNewAdministratorRequestSpecifications({message: ""})
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function ownerAddAdmin(){
        const data = {
            username: newAdministratorRequest.name
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        let input = IPv4 + "/Licenta/models/OwnerAddAdmin.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                //this.props.setUser(dates.data.email);
                setErrorData({message: dates.message})
                setNewAdministratorRequest({name: ""})
            })
    }
    
    const handleAddAdministrator = e => {
        e.preventDefault();
        console.log(newAdministratorRequest.name);
        console.log(newAdministratorRequestSpecifications.message);
        if(newAdministratorRequest.name === ""){
            setErrorData({message: "Trebuie sa introduci numele."})
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        } else {
            if (username.name === newAdministratorRequest.name) {
                setErrorData({message: "Nu te poti propune pe tine."})
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
            } else {
                sendAddAdmin();
                setErrorData({message: "Actiune realizata!"})
                Array.from(document.querySelectorAll("input")).forEach(
                    input => (input.value = "")
                );
                //setNewAdministratorRequestSpecifications({message: ""})
            }
        }
    }
    
    const handleAddAdministratorByOwner = e => {
        e.preventDefault();
        console.log(newAdministratorRequest.name);
        if(newAdministratorRequest.name === ""){
            setErrorData({message: "Campul nu are voie sa fie gol!"})
        } else if(newAdministratorRequest.name === username.name){
            setErrorData({message: "Nu te poti propune pe tine!"})
        } else{
            ownerAddAdmin();
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );
        }
    }

    function AddUserPoints(userEmail) {
        console.log(emailUserQuestionAccepted.email)
        const data = {
            email: userEmail,
            numberOfPoints: questionPoints.points
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AdminCreateTokenAddPoints.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.JWT);
                localStorage.setItem('token', data.JWT);
                //window.dispatchEvent(new Event("storage"));
            })
            .catch((error) => {
                console.log(error);
            });


    }

    function AcceptTrainingQuestion(id, question, var1, var2, var3, var4, varcorrect, email) {
        console.log(id)

        const data = {
            question_id: id,
            question: question,
            var_1: var1,
            var_2: var2,
            var_3: var3,
            var_4: var4,
            correct_answer: varcorrect
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AdminConfirmPendingTrainingQueries.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        AddUserPoints(email);
    }

    function DeleteTrainingQuestion(id) {
        const data = {
            question_id: id,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AdminDeletePendingQuestions.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    
    function AcceptAdminRequest(id){
        const data = {
            request_id: id,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AdminAcceptAdministratorRequest.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function DeleteAdminRequest(id){
        const data = {
            request_id: id,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AdminDeleteAdministratorRequest.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function AcceptPendingResponse(id){
        const data = {
            pending_response_id: id,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AcceptPendingResponse.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    function DeletePendingResponse(id){
        const data = {
            pending_response_id: id,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/DeletePendingResponse.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleOnCellClick = (params) => {
        if (params.field === 'acceptQuestion') {
            rows.map((item) => {
                if (item["id"] === params.id) {
                    AcceptTrainingQuestion(params.id, item["question"], item["var1"], item["var2"], item["var3"], item["var4"], item["varcorrect"], item["email"])
                    console.log(item["id"], item["question"], item["var1"], item["var2"], item["var3"], item["var4"], item["varcorrect"], item["email"])
                }
            })

        } else {
            if (params.field === 'deleteQuestion') {
                DeleteTrainingQuestion(params.id)
            }
        }

        //console.log(params.id, params.field, params.value);
    };
    
    const handleAdministratorRequestOnCellClick = (params) => {
        if(params.field === 'acceptRequestAdministrator'){
            pendingAdministratorRows.map((item) => {
                if(item["id"] === params.id){
                    AcceptAdminRequest(params.id);
                    console.log(params.id);
                }
            })
            
        }else {
            if (params.field === 'deleteRequestAdministrator') {
                DeleteAdminRequest(params.id);
            }
        }

        //console.log(params.id, params.field, params.value);
    };

    const handleOnCellClickResponses = (params) => {
        if(params.field === 'acceptPendingResponse'){
            pendingAdministratorRows.map((item) => {
                if(item["id"] === params.id){
                    AcceptPendingResponse(params.id);
                    console.log(params.id);
                }
            })

        }else {
            if (params.field === 'deletePendingResponse') {
                DeletePendingResponse(params.id);
            }
        }
    }
    return (
        <div>
            {userGrade.grade === "administrator" && <h2 id="h2Title">Admin page</h2>}
            {userGrade.grade === "owner" && <h2 id="h2Title">Owner page</h2>}
            <div>
                <div className="formulary">
                    <div id="formularyChild">
                        <p id="title">Number of users</p>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label={usersNumber.number}
                            InputProps={{
                                inputProps: {
                                    style: {textAlign: "center"},
                                }
                            }}
                        />
                    </div>
                    <div id="formularyChild">
                        <p id="title">Your Grade</p>
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
                </div>
            </div>
            {userGrade.grade === "administrator" &&
            <div className="addAdministrator">
                <div id="addAdministratorChild">
                    <form onSubmit={handleAddAdministrator}>
                        <p id="title">Propune un administrator</p>
                        <div>
                            <TextField
                                id="standard-required"
                                label={"Write here the username"}
                                variant="standard"
                                style={{width: 300}}
                                onChange={e => newAdministratorRequest.name = e.target.value}
                            />
                        </div>
                        <div>
                            <p id="title">Specificatii</p>
                            <TextareaAutosize
                                id="id-specifications"
                                aria-label="empty textarea"
                                placeholder="Write here your specifications"
                                minRows={2}
                                style={{width: 300}}
                                value={newAdministratorRequestSpecifications.message}
                                onChange={e => setNewAdministratorRequestSpecifications({message: e.target.value})}
                            />
                        </div>
                        <div className="buttonLogin" id="childChangeDetails">
                            <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                        <div className="errorSubmit">
                            {errorData.message}
                        </div>
                    </form>
                </div>
            </div>}
            {
                userGrade.grade === "owner" &&
                <div className="addAdministrator">
                    <div id="addAdministratorChild">
                        <form onSubmit={handleAddAdministratorByOwner}>
                            <p id="title">Adaugă un administrator</p>
                            <div>
                                <TextField
                                    id="standard-required"
                                    label={"Write here the username"}
                                    variant="standard"
                                    style={{width: 300}}
                                    value = {newAdministratorRequest.name}
                                    onChange={e => setNewAdministratorRequest.name = e.target.value}
                                />
                            </div>
                            <div className="buttonLogin" id="childChangeDetails">
                                <button className="btn btn-primary btn-block">Submit</button>
                            </div>
                            <div className="errorSubmit">
                                {errorData.message}
                            </div>
                        </form>
                    </div>
                </div>
            }

            <div className="container">
                <h1>Întrebări în așteptare</h1>
                <div style={{height: 400, width: '100%'}}>
                    <Box
                        sx={{
                            height: 300,
                            width: 1,
                            '& .super-app-theme--cell-accept': {
                                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                            '& .super-app-theme--cell-delete': {
                                backgroundColor: '#d47483',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            onCellClick={handleOnCellClick}
                        />
                    </Box>
                </div>
            </div>
            {userGrade.grade === "owner" && <div className="container">
                <h1>Cereri de administrator</h1>
                <div style={{height: 400, width: '100%'}}>
                    <Box
                        sx={{
                            height: 300,
                            width: 1,
                            '& .super-app-theme--cell-accept': {
                                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                            '& .super-app-theme--cell-delete': {
                                backgroundColor: '#d47483',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                        }}
                    >
                        <DataGrid
                            rows={pendingAdministratorRows}
                            columns={administratorRequestColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            onCellClick={handleAdministratorRequestOnCellClick}
                        />
                    </Box>
                </div>
            </div>}

            <div className="container">
                <h1>Răspunsuri greșite în așteptare</h1>
                <div style={{height: 400, width: '100%'}}>
                    <Box
                        sx={{
                            height: 300,
                            width: 1,
                            '& .super-app-theme--cell-accept': {
                                backgroundColor: 'rgba(157, 255, 118, 0.49)',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                            '& .super-app-theme--cell-delete': {
                                backgroundColor: '#d47483',
                                color: '#1a3e72',
                                fontWeight: '600',
                            },
                        }}
                    >
                        <DataGrid
                            rows={pendingResponsesRows}
                            columns={pendingResponsesColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            onCellClick={handleOnCellClickResponses}
                        />
                    </Box>
                </div>
            </div>
            
        </div>
    )
}
