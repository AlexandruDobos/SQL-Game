import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import '../css/admin.css'
import IPv4 from '../index.js'
import {FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize} from "@mui/material";
import {Email} from "@mui/icons-material";
import {DataGrid} from '@mui/x-data-grid';

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
        },
        {
            field: 'question',
            headerName: 'Question',
            description: 'Intrebarea propusa de utilizator',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'difficulty',
            headerName: 'Dificultate',
            description: 'Ce tip de dificultate are intrebarea',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'var1',
            headerName: 'var_1',
            description: 'Prima varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'var2',
            headerName: 'var_2',
            description: 'A doua varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'var3',
            headerName: 'var_3',
            description: 'A treia varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'var4',
            headerName: 'var_4',
            description: 'A patra varianta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'varcorrect',
            headerName: 'correct_answer',
            description: 'Varianta corecta de raspuns',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'user',
            headerName: 'user',
            description: 'Numele utilizatorului ce a propus intrebarea',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'email',
            headerName: 'email',
            description: 'Emailul utilizatorului ce a propus intrebarea',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'acceptQuestion',
            headerName: 'Accepta',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'ACCEPT',
        },
        {
            field: 'deleteQuestion',
            headerName: 'Sterge',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'DELETE',
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
        },
        {
            field: 'username',
            headerName: 'Username',
            description: 'Username propus',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'email',
            headerName: 'Email',
            description: 'Emailul celui propus',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'who_proposed_username',
            headerName: 'Username propunător',
            description: 'Usernameul celui ce a propus ',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'who_proposed_email',
            headerName: 'Email propunător',
            description: 'Emailul celui ce a propus ',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'specifications',
            headerName: 'Specificatii',
            description: 'Detalii despre propunere',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'acceptRequestAdministrator',
            headerName: 'Accepta',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'ACCEPT',
        },
        {
            field: 'deleteRequestAdministrator',
            headerName: 'Respinge',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'DELETE',
        },
    ]
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
                <h1>Pending Training Questions</h1>
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

            {/*            <form onSubmit={handleSubmit}>
                    <div className="buttonSubmit">
                            <button className="btn btn-primary btn-block">Submit
                            </button>
                    </div>
                
            </form>*/}
        </div>
    )
}
