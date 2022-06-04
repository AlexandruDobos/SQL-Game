import React, {useState} from 'react'
import '../css/challenges.css'
import IPv4 from '../index';
import TextField from "@mui/material/TextField";
import {DataGrid} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {FormControl, FormControlLabel, Paper, Popper, Radio, RadioGroup, TextareaAutosize} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

export default function Challenges() {

    const [token, setToken] = useState({token: localStorage.getItem("token")})
    const [email, setEmail] = useState({email: ""});
    const [username, setUsername] = useState({username: ""})
    const [whoProposedUsername, setWhoProposedUsername] = useState({username: ""})
    const [points, setPoints] = useState({points: ""})
    const [challengeMessage, setChallengeMessage] = useState({message: ""})
    const [challengesDetails, setChallengesDetails] = useState({
        winChallenges: 0,
        lostChallenges: 0
    })
    const [questionData, setQuestionData] = useState({
        questionId: "",
        question: "",
        var_1: "",
        var_2: "",
        var_3: "",
        var_4: "",
        correct_answer: "",
        number_of_answers: ""
    })
    const [clickOnCorrectCell, setClickOnCorrectCell] = useState({value: "false"})
    const [questionDifficulty, setQuestionDifficulty] = useState({value: ""})
    const [stake, setStake] = useState({value: ""})
    const [checked, setChecked] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [selectedAnswer, setSelectedAnswer] = useState({answer: ""});
    const [hardQuestionResponse, setHardQuestionsResponse] = React.useState({value: ""})
    const [submitForm, setSubmitForm] = useState({value: false});
    const [rows, setRows] = useState([])
    let columns = [
        {
            field: 'who_provoked',
            headerName: 'Provocare de la',
            description: 'Utilizatorul ce ți-a trimis provocarea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'difficulty',
            headerName: 'Dificultate',
            description: 'Dificultatea intrebarii: easy/medium/hard',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'stake',
            headerName: 'Miza provocării',
            description: 'Cât a pariat utilizatorul pentru aceasta provocare',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'time',
            headerName: 'Data provocării',
            description: 'Cand ti-a trimis utilizatorul provocarea',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'acceptChallenge',
            headerName: 'Accepta provocarea',
            description: 'Accepta provocarea',
            sortable: false,
            cellClassName: 'super-app-theme--cell-accept',
            width: 160,
            valueGetter: () => 'Acceptă',
            renderCell: renderCellExpand,
        },
        {
            field: 'deleteChallenge',
            headerName: 'Respinge provocarea',
            description: 'Nu accepta provocarea',
            sortable: false,
            cellClassName: 'super-app-theme--cell-delete',
            width: 160,
            valueGetter: () => 'Respinge',
            renderCell: renderCellExpand,
        },
    ];

    const [seconds, setSeconds] = useState(1000000);
    const [expiredTime, setIsExpiredTime] = useState({value: "false"})
    const [semaphore, setSemaphore] = useState(true)
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

    function DecodeJWT() {
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
                .then((data) => {
                    //this.props.setUser(dates.data.email);
                    setEmail({
                        email: data["JWT"]["data"]["email"]
                    })
                    setUsername({
                        username: data["JWT"]["data"]["username"]
                    })
                    setPoints({
                        points: data["JWT"]["data"]["username"]
                    })
                    setChallengesDetails({
                        winChallenges: data["JWT"]["data"]["userWinChallenges"],
                        lostChallenges: data["JWT"]["data"]["userLostChallenges"]
                    })
                    GetChallenges(data["JWT"]["data"]["username"]);
                    //setClickOnCorrectCell({value: "false"})
                    setSubmitForm({value: "false"})
                    setIsExpiredTime({value: "false"})
                    //setChallengeMessage({message: ""})
                })
        }
    }

    function GetChallenges(username) {

        const data = {
            username: username
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };

        let input = IPv4 + "/Licenta/models/SelectChallenges.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setRows(data.message)
            })
    }

    function IncrementResultChallenges(parameter) {
        const data = {
            email: email.email,
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        if (parameter === "win") {
            let input = IPv4 + "/Licenta/models/CreateTokenIncrementWinChallenges.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('token', data.JWT);
                    window.dispatchEvent(new Event("storage"));
                })
        } else if (parameter === "lost") {
            let input = IPv4 + "/Licenta/models/CreateTokenIncrementLostChallenges.php"
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

    function ChangePoints(parameter, numberOfPoints) {
        const data = {
            email: email.email,
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

    function AddPointsToRival() {
        const data = {
            username: whoProposedUsername.username,
            stake: parseInt(stake.value) * 2
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/AddPointsToRival.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("puncte adaugate rivalului")
            })
    }

    function SelectQuestion(question_id) {
        const data = {
            question_id: question_id
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/SelectQuestionForChallenge.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {

                let x = Math.floor(Math.random() * 4) + 1;
                setQuestionData({
                    questionId: data.questionId,
                    question: data.question,
                    var_1: data.wrong_answer1,
                    var_2: data.wrong_answer2,
                    var_3: data.wrong_answer3,
                    var_4: data.correct_answer,
                    correct_answer: data.correct_answer,
                    number_of_answers: data.number_of_solve
                })
                if (x === 1) {
                    setQuestionData({
                        questionId: data.questionId,
                        question: data.question,
                        var_1: data.correct_answer,
                        var_4: data.wrong_answer1,
                        var_2: data.wrong_answer2,
                        var_3: data.wrong_answer3,
                        correct_answer: data.correct_answer,
                        number_of_answers: data.number_of_solve
                    })
                } else {
                    if (x === 2) {
                        setQuestionData({
                            questionId: data.questionId,
                            question: data.question,
                            var_2: data.correct_answer,
                            var_4: data.wrong_answer2,
                            var_1: data.wrong_answer1,
                            var_3: data.wrong_answer3,
                            correct_answer: data.correct_answer,
                            number_of_answers: data.number_of_solve
                        })
                    } else {
                        if (x === 3) {
                            setQuestionData({
                                questionId: data.questionId,
                                question: data.question,
                                var_3: data.correct_answer,
                                var_4: data.wrong_answer3,
                                var_1: data.wrong_answer1,
                                var_2: data.wrong_answer2,
                                correct_answer: data.correct_answer,
                                number_of_answers: data.number_of_solve
                            })
                        }
                    }
                }

                /*console.log(data.question)
                console.log(data.wrong_answer1)
                console.log(data.wrong_answer2)
                console.log(data.wrong_answer3)
                console.log(data.correct_answer)
                console.log(data.correct_answer)*/

            })
    }

    function CountReplyForQuestion() {
        console.log(questionData.questionId);
        const data = {
            question_id: questionData.questionId
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/CountReplyQuestion.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Actiune reusita!") {
                    console.log("succes!");
                } else {
                    console.log("fail!");
                }
            })
    }

    function CheckHardQuestion(userResponse) {
        console.log(userResponse);
        if (userResponse === "") {
            setChallengeMessage({message: "Raspuns gresit!"})
            IncrementResultChallenges("lost")
            AddPointsToRival();
        } else {
            const data = {
                correct_answer: questionData.correct_answer,
                user_query_answer: userResponse
            }
            console.log(JSON.stringify(data));
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            };
            let input = IPv4 + "/Licenta/models/VerifyQueryResponseFromUser.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    console.log(dates.message);
                    if (dates.message === "Raspuns corect!") {
                        setChallengeMessage({message: "Raspuns corect, ai primit punctele!"})
                        ChangePoints("add", parseInt(stake.value) * 2);
                        IncrementResultChallenges("win")
                    } else {
                        if (dates.message === "Raspuns gresit!") {
                            setChallengeMessage({message: "Raspuns gresit!"})
                            IncrementResultChallenges("lost")
                            AddPointsToRival();
                        }
                    }
                })
        }
    }

    function DeleteChallenge(id) {
        const data = {
            id: id
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };

        let input = IPv4 + "/Licenta/models/DeleteChallenge.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Challenge sters!") {
                    GetChallenges(username.username)
                }
            })
    }

    React.useEffect(() => {
        DecodeJWT();
        window.addEventListener('storage', () => {
            DecodeJWT();
        });

    }, [token.token])

    const handleChange = e => {
        e.preventDefault();
        const {value} = e.target;
        console.log(e.target.value);
        setChecked(() => {
            return {
                var_1: false,
                var_2: false,
                var_3: false,
                var_4: false,
                [e.target.value]: true
            };
        });
        if (e.target.value === "var_1") {
            setSelectedAnswer({answer: questionData.var_1})
        } else {
            if (e.target.value === "var_2") {
                setSelectedAnswer({answer: questionData.var_2})
            } else {
                if (e.target.value === "var_3") {
                    setSelectedAnswer({answer: questionData.var_3})
                } else {
                    if (e.target.value === "var_4") {
                        setSelectedAnswer({answer: questionData.var_4})
                    }
                }
            }
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setClickOnCorrectCell({value: "false"})
        if (questionDifficulty.value !== "hard") {
            if (!selectedAnswer.answer) {
                setChallengeMessage({message: "Trebuie sa alegi o variantă!"})
            } else {
                setSubmitForm({value: "true"})
            }

            if (selectedAnswer.answer === questionData.correct_answer) {
                if (questionDifficulty.value === "easy") {
                    setChallengeMessage({message: "Raspuns corect, ai primit punctele!"})
                    ChangePoints("add", parseInt(stake.value) * 2);
                    IncrementResultChallenges("win")
                    CountReplyForQuestion();
                } else {
                    setChallengeMessage({message: "Raspuns gresit"})
                    IncrementResultChallenges("lost")
                    CountReplyForQuestion();
                    AddPointsToRival();
                }
            } else {
                if (selectedAnswer.answer) {

                    if (questionDifficulty.value === "easy") {
                        setChallengeMessage({message: "Raspuns gresit"})
                        CountReplyForQuestion();
                        IncrementResultChallenges("lost")
                        AddPointsToRival();
                    } else {
                        setChallengeMessage({message: "Raspuns gresit"})
                        CountReplyForQuestion();
                        IncrementResultChallenges("lost")
                        AddPointsToRival();
                    }
                }
            }
        } else {
            CheckHardQuestion(hardQuestionResponse.value);
            setSubmitForm({value: "true"})
            CountReplyForQuestion();
        }


    };

    const handleOnCellClick = (params) => {
        setChallengeMessage({message: ""})
        setSelectedAnswer({answer: ""})
        setHardQuestionsResponse({value: ""})
        setChecked(() => {
            return {
                var_1: false,
                var_2: false,
                var_3: false,
                var_4: false
            };
        });
        if (params.field === 'acceptChallenge') {
            setSemaphore(true);
            setClickOnCorrectCell({value: "true"})
            //vad daca are puncte suficiente sa accepte, altfel mesaj eroare
            rows.map((item) => {
                if (item["id"] === params.id) {
                    if (item["stake"] <= points.points) {
                        setWhoProposedUsername({username: item["who_provoked"]})
                        console.log("are puncte destule")
                        console.log(parseInt(item["stake"]))
                        setStake({value: item["stake"]})
                        //daca are puncte suficiente, ii scad din punctaj miza provocarii
                        ChangePoints("decrement", parseInt(item["stake"]))

                        setQuestionDifficulty({value: item["difficulty"]})
                        if (item["difficulty"] === "easy") {
                            setSeconds(30);
                        } else if (item["difficulty"] === "medium") {
                            setSeconds(45);
                        } else if (item["difficulty"] === "hard") {
                            setSeconds(120);
                        }
                        //iau id-ul intrebarii si selectez din training_queries intrebarea si o formulez
                        SelectQuestion(item["id_query"])
                        //trebuie sa vad ce id are provocarea si o sa o sterg din baza de date
                        DeleteChallenge(item["id"])
                    } else {
                        setChallengeMessage({value: "Nu ai suficiente puncte pentru a accepta provocarea!"})
                    }
                }
            })

            //dupa ce formulez intrebarea verific daca raspunsul e corect
            //daca e corect -> adaug dublul mizei in baza de date
            //daca nu e corect -> mesaj ca a pierdut provocarea

        } else {
            if (params.field === 'deleteChallenge') {
                //daca nu accepta provocarea, sterg provocarea din baza de date.
                rows.map((item) => {
                    if (item["id"] === params.id) {
                        DeleteChallenge(item["id"])
                    }
                })
            }
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s - 1);
            if (seconds < 1) {
                setIsExpiredTime({value: "true"});
                setSubmitForm({value: "true"});
                setClickOnCorrectCell({value: "false"})
                if(semaphore === true){
                setChallengeMessage({message: "Timpul a expirat, ai pierdut provocarea!"})
                    setSemaphore(false);
                }
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div>
            <div className="formulary">
                <div id="formularyChild">
                <p id="title">Total Challenges</p>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label={parseInt(challengesDetails.winChallenges) + parseInt(challengesDetails.lostChallenges)}
                />
                </div>
            </div>
            <div className="formulary">
                <div id="formularyChild">
                    <p id="title">Win Challenges</p>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label={challengesDetails.winChallenges}
                    />
                </div>
                <div id="formularyChild">
                    <p id="title">Lost Challenges</p>
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label={challengesDetails.lostChallenges}
                    />
                </div>
            </div>
            <div className="centerContent">
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
            {clickOnCorrectCell.value === "true" && expiredTime.value === "true" && submitForm.value === "false" &&
            <div className="centerContent">
                <h3>Timp expirat, ai pierdut provocarea!</h3>
            </div>}
            {clickOnCorrectCell.value === "true" && expiredTime.value === "false" &&
            <div className="centerContent">
                <button className="btn btn-primary btn-block">Timp
                    rămas <TimerIcon/>: {seconds} secunde
                </button>
            </div>}
            <div>
                {clickOnCorrectCell.value === "true" && questionDifficulty.value !== "hard" &&
                <div>
                    <div className="itemCenterContent">
                        <p> {questionData.question} </p>
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                {/*<FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>*/}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel checked={checked.var_1} value="var_1" control={<Radio/>}
                                                      onChange={handleChange}
                                                      label={questionData.var_1}/>
                                    <FormControlLabel checked={checked.var_2} value="var_2" control={<Radio/>}
                                                      onChange={handleChange}
                                                      label={questionData.var_2}/>
                                    <FormControlLabel checked={checked.var_3} value="var_3" control={<Radio/>}
                                                      onChange={handleChange}
                                                      label={questionData.var_3}/>
                                    <FormControlLabel checked={checked.var_4} value="var_4" control={<Radio/>}
                                                      onChange={handleChange}
                                                      label={questionData.var_4}/>
                                </RadioGroup>
                                <div className="buttonSubmit">
                                    <div>
                                        {
                                            <button
                                                className="btn btn-primary btn-block">Submit
                                            </button>}

                                    </div>
                                </div>
                            </FormControl>
                        </form>
                    </div>

                </div>}
                {clickOnCorrectCell.value === "true" && questionDifficulty.value === "hard" &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Paper>
                                <div className="justified">
                                    <h2>{questionData.question}</h2>
                                </div>
                                <div className="justified">
                                    <TextareaAutosize
                                        id="idResponseQuestion1"
                                        aria-label="empty textarea"
                                        placeholder="Write your response here"
                                        minRows={3}
                                        style={{width: 600}}
                                        value={hardQuestionResponse.value}
                                        onChange={e => setHardQuestionsResponse({value: e.target.value})}
                                    />
                                </div>
                                    <div className="buttonSubmit">
                                            <button
                                                className="btn btn-primary btn-block">Submit
                                            </button>

                                    </div>
                            </Paper>
                        </div>
                    </form>
                </div>}
                {<div className="errorSubmit">
                    {challengeMessage.message}
                </div>}
            </div>
        </div>
    )


    //trebuie sa afisez aici cate challenges a primit pana acum,
    //trebuie sa afisez aici cate challenges a reusit corecte
    //trebuie sa afisez aici cate challenges a gresit
    //trebuie sa afisez aici challenge-urile utilizatorului
}