import React, {useState} from 'react';
import '../css/training.css'
import {
    FormControl,
    FormControlLabel,
    FormLabel, Grid, InputLabel, MenuItem,
    Paper, Popper,
    Radio,
    RadioGroup, Select, Slider,
    Switch,
    TextareaAutosize
} from "@mui/material";
import IPv4 from "../index";
import {DataGrid} from "@mui/x-data-grid";
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SupportIcon from '@mui/icons-material/Support';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {Input} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import diagram from "../images/structura_tabele.svg";
import diagram_mobile from "../images/diagrama_tabele_telefon.svg";
import PropTypes from "prop-types";

export default function Training() {

    const [state, setState] = useState({email: ""});
    const [username, setUsername] = useState({username: ""})
    const [points, setPoints] = useState({points: ""})
    let easyPoints = 25;
    let easyHelpQuestionPoints = 15;
    let easyAddFedbackPoints = 5;
    let easyShowFedbackPoints = 5;
    let mediumPoints = 50;
    let mediumHelpQuestionPoints = 30;
    let mediumAddFedbackPoints = 10;
    let mediumShowFedbackPoints = 10;
    let hardPoints = 150;
    let hardHelpQuestionPoints = 90;
    let hardAddFedbackPoints = 30;
    let hardShowFedbackPoints = 30;
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
    const [submitForm, setSubmitForm] = useState({value: false});
    const [errorData, setErrorData] = useState({message: ""});
    const [submitMessage, setSubmitMessage] = useState({message: ""});
    const [selectedAnswer, setSelectedAnswer] = useState({answer: ""});
    const [checked, setChecked] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [typeOfQuestionFromDatabase, setTypeOfQuestionFromDatabase] = useState({value: ""});
    const [easy, setEasy] = React.useState({value: "false"});
    const [medium, setMedium] = React.useState({value: "false"});
    const [hard, setHard] = React.useState({value: "false"});
    const [hardQuestionResponse, setHardQuestionsResponse] = React.useState({value: ""})
    const [isPlayButtonPressed, setIsPlayButtonPressed] = React.useState({value: "false"})
    const [feedbackQuestions, setFeedbackQuestion] = useState({});
    const [buttonShowFeedback, setButtonShowFeedback] = useState({value: "false"})
    const [isClickOnSubmitForAddFeedback, setIsClickOnSubmitForAddFeedback] = useState({value: "false"})
    const [userFeedback, setUserFeedback] = useState({answer: ""})
    const [isOkFeedback, setIsOkFeedback] = useState({value: "false"})
    const [isSendFeedbackButtonPressed, setIsSendFeedbackPressed] = useState({value: "false"})
    const [isChallengePressed, setIsChallengePressed] = useState({value: "false"})
    const [isSendChallengePressed, setIsSendChallengePressed] = useState({value: "false"})
    const [showSendChallengeButton, setShowSendChallengeButton] = useState({value: "false"})
    const [stake, setStake] = React.useState('');
    const [usernameForSendChallenge, setUsernameForSendChallenge] = useState({value: ""})
    const [messageForSendChallenge, setMessageForSendChallenge] = useState({value: ""})
    const [rows, setRows] = useState([])
    let columns = [
        {
            field: 'time',
            headerName: 'Time',
            description: 'Cand a lasat utilizatorul acest feedback',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'user_who_send',
            headerName: 'User',
            description: 'Username-ul celui ce a lasat feedback-ul',
            sortable: false,
            editable: false,
            width: 160,
            renderCell: renderCellExpand,
        },
        {
            field: 'feedback',
            headerName: 'Feedback',
            description: 'Parerea utilizatorului despre intrebare',
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


    const [seconds, setSeconds] = useState(5);
    const [expiredTime, setIsExpiredTime] = useState({value: "false"})

    const [isDisplayImage, setIsDisplayImage] = useState({value: "false"})
    const [textForImageButton, setTextForImageButton] = useState({value: "Afișează diagrama bazei de date!"})
    const [isImageCreate, setIsImageCreate] = useState({value: "false"});

    const [isHelpButtonPressed, setIsHelpButtonPressed] = useState({value: "false"})
    const [disableFormControlForHelp, setDisableFormControlForHelp] = useState({
        var1: false,
        var2: false,
        var3: false,
        var4: false
    })
    const [stringForHardQuestionHelp, setStringForHardQuestionHelp] = useState({value: ""})
    const [errorMessageForHelpQuestion, setErrorMessageForHelpQuestion] = useState({message: ""})
    const [isDecrementPoints, setIsDecrementPoints] = useState(false);
    const handleSetStake = (event) => {
        setStake(event.target.value);
    };

    function decodeJWT() {
        if (localStorage.getItem("token")) {
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
                    //this.props.setUser(dates.data.email);
                    setState({
                        email: dates["JWT"]["data"]["email"]
                    })
                    setUsername({
                        username: dates["JWT"]["data"]["username"]
                    })
                    setPoints({
                        points: dates["JWT"]["data"]["points"]
                    })
                })
        }
    }

    function SelectFeedbackQuestion(id) {
        //console.log("id este: ", id);
        const data = {
            question_id: id
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
        };
        let input = IPv4 + "/Licenta/models/SelectFeedbackQuestion.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                setRows(data.message)
            })
    }

    function isUpper(str) {
        return !/[a-z]/.test(str) && /[A-Z]/.test(str);
    }

    function selectQueries() {
        setIsDecrementPoints(false);
        setIsExpiredTime({value: "false"})
        setSubmitForm({value: "false"});
        setErrorData({message: ""})
        setStringForHardQuestionHelp({value: ""});
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setIsHelpButtonPressed({value: "false"})
        setButtonShowFeedback({value: "false"})
        setIsChallengePressed({value: "false"});
        setStake('');
        setChecked(() => {
            return {
                var_1: false,
                var_2: false,
                var_3: false,
                var_4: false
            };
        });
        setSubmitForm({value: false})
        setSelectedAnswer({answer: ""})
        setSubmitMessage({message: ""})
        const data = {
            easy: easy.value,
            medium: medium.value,
            hard: hard.value
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        let input = IPv4 + "/Licenta/models/SelectTrainingQuestionsByFilters.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.difficulty === "hard") {
                    setSeconds(120);
                    let correctAnswer = data.correct_answer.split(" ");
                    let helpText = "";
                    for (let index = 0; index < correctAnswer.length; index++) {
                        if (isUpper(correctAnswer[index])) {
                            helpText = helpText + correctAnswer[index] + " ";
                            console.log(helpText)
                            setStringForHardQuestionHelp({value: helpText});
                        }
                    }
                }
                if (data.difficulty === "medium") {
                    setSeconds(45);
                }
                if (data.difficulty === "easy") {
                    setSeconds(30);
                }
                //console.log(data.difficulty)
                //console.log(data.correct_answer)
                SelectFeedbackQuestion(data.questionId)
                setTypeOfQuestionFromDatabase({value: data.difficulty})
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

    function changePoints(parameter, numberOfPoints) {
        const data = {
            email: state.email,
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

    function countReplyForQuestion() {
        //console.log(questionData.questionId);
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
                    //console.log("succes!");
                } else {
                    console.log("fail!");
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
        //selectQueries();

    }, [localStorage.getItem("token")]);

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

    function checkHardQuestion(userResponse) {
        console.log(userResponse);
        if (userResponse === "") {
            setSubmitMessage({message: "Raspuns gresit, ai pierdut " + hardPoints + " puncte!"})
            changePoints("decrement", hardPoints);
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
                        setSubmitMessage({message: "Raspuns corect, ai primit " + hardPoints + " puncte!"})
                        changePoints("add", hardPoints);
                    } else {
                        if (dates.message === "Raspuns gresit!") {
                            setSubmitMessage({message: "Raspuns gresit, ai pierdut " + hardPoints + " puncte!"})
                            changePoints("decrement", hardPoints);

                            const data = {
                                correct_answer: questionData.correct_answer,
                                user_response: userResponse,
                                question_id_from_training_queries: questionData.questionId
                            };

                            const requestOptions = {
                                method: "POST",
                                body: JSON.stringify(data)
                            };

                            let input = IPv4 + "/Licenta/models/AddResponseToPendingResponses.php"
                            fetch(
                                input,
                                requestOptions
                            )
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(data.message);
                                })
                        }
                    }
                })
        }
    }

    function AddFeedbackInDatabase() {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        console.log(questionData.questionId)
        console.log(username.username)
        console.log(userFeedback.answer)
        console.log(dateTime)

        const data = {
            question_id: questionData.questionId,
            user_who_send: username.username,
            feedback: userFeedback.answer,
            time: dateTime
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        };
        let input = IPv4 + "/Licenta/models/AddFeedback.php"
        fetch(
            input,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Actiune reusita!") {
                    setIsOkFeedback({value: "true"})
                    SelectFeedbackQuestion(questionData.questionId)
                }
            })
    }

    const handleNextButton = e => {
        setHardQuestionsResponse({value: ""})
        e.preventDefault();
        if (easy.value === "true" || medium.value === "true" || hard.value === "true") {
            if (easy.value === "true") {
                console.log(points.points);
                if (points.points < easyPoints) {
                    setIsPlayButtonPressed({value: "false"})
                    setEasy({value: "false"})
                    setMedium({value: "false"})
                    setHard({value: "false"})
                    setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări easy."});
                } else {
                    selectQueries();
                }
            }
            if (medium.value === "true") {
                console.log(points.points);
                if (points.points < mediumPoints) {
                    setIsPlayButtonPressed({value: "false"})
                    setEasy({value: "false"})
                    setMedium({value: "false"})
                    setHard({value: "false"})
                    setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări medium."});
                } else {
                    selectQueries();
                }
            }
            if (hard.value === "true") {
                console.log(points.points);
                if (points.points < hardPoints) {
                    setIsPlayButtonPressed({value: "false"})
                    setEasy({value: "false"})
                    setMedium({value: "false"})
                    setHard({value: "false"})
                    setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări hard."});
                } else {
                    selectQueries();
                }
            }
        }
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s - 1);
            if (seconds === 1) {
                setIsExpiredTime({value: "true"});
                setSubmitForm({value: "true"});
                if (typeOfQuestionFromDatabase.value === "easy") {
                    //setSubmitMessage({message: "Timpul a expirat, ai pierdut " + easyPoints + " puncte!"})
                    if (isDecrementPoints === false) {
                            changePoints("decrement", easyPoints);
                            countReplyForQuestion();
                            setIsDecrementPoints(true);
                    }
                } else if (typeOfQuestionFromDatabase.value === "medium") {
                    //setSubmitMessage({message: "Timpul a expirat, ai pierdut " + mediumPoints + " puncte!"})
                    if (isDecrementPoints === false) {
                            changePoints("decrement", mediumPoints);
                            countReplyForQuestion();
                            setIsDecrementPoints(true);
                    }
                } else if (typeOfQuestionFromDatabase.value === "hard") {
                    //setSubmitMessage({message: "Timpul a expirat, ai pierdut " + hardPoints + " puncte!"})
                    if (isDecrementPoints === false) {
                            changePoints("decrement", hardPoints);
                            countReplyForQuestion();
                            setIsDecrementPoints(true);
                    }
                }
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    const handleSubmit = e => {
        e.preventDefault();
        setButtonShowFeedback({value: "false"})
        setIsClickOnSubmitForAddFeedback({value: "false"})
        setIsOkFeedback({value: "false"})
        setUserFeedback({answer: ""})
        setErrorData({message: ""})
        if (typeOfQuestionFromDatabase.value !== "hard") {
            if (!selectedAnswer.answer) {
                setSubmitMessage({message: "Trebuie sa alegi o variantă!"})
            } else {
                setSubmitForm({value: true})
                setSeconds(0);
            }

            if (selectedAnswer.answer === questionData.correct_answer) {
                if (typeOfQuestionFromDatabase.value === "easy") {
                    setSubmitMessage({message: "Raspuns corect, ai primit " + easyPoints + " puncte!"})
                    changePoints("add", easyPoints);
                    countReplyForQuestion();
                } else {
                    changePoints("add", mediumPoints);
                    setSubmitMessage({message: "Raspuns corect, ai primit " + mediumPoints + " puncte!"})
                    countReplyForQuestion();
                }
            } else {
                if (selectedAnswer.answer) {

                    if (typeOfQuestionFromDatabase.value === "easy") {
                        setSubmitMessage({message: "Raspuns gresit, ai pierdut " + easyPoints + " puncte!"})
                        changePoints("decrement", easyPoints);
                        countReplyForQuestion();
                    } else {
                        setSubmitMessage({message: "Raspuns gresit, ai pierdut " + mediumPoints + " puncte!"})
                        changePoints("decrement", mediumPoints);
                        countReplyForQuestion();
                    }
                }
            }
        } else {
            checkHardQuestion(hardQuestionResponse.value);
            setSubmitForm({value: true})
            countReplyForQuestion();
        }


    };

    const handlePlayClick = e => {
        e.preventDefault();
        if (easy.value === "true" || medium.value === "true" || hard.value === "true") {
            setIsPlayButtonPressed({value: "true"})
            selectQueries();
        }

    }

    const handleButtonShowFeedback = e => {
        e.preventDefault();
        setIsSendChallengePressed({value: "false"})
        if (buttonShowFeedback.value === "false") {
            setButtonShowFeedback({value: "true"})
            if (typeOfQuestionFromDatabase.value === "easy") {
                changePoints("decrement", easyShowFedbackPoints)
            } else if (typeOfQuestionFromDatabase.value === "medium") {
                changePoints("decrement", mediumShowFedbackPoints)
            } else if (typeOfQuestionFromDatabase.value === "hard") {
                changePoints("decrement", hardShowFedbackPoints)
            }
        } else {
            setButtonShowFeedback({value: "false"})
        }
    }

    const handleButtonForAddFeedback = e => {
        e.preventDefault();
        setIsSendChallengePressed({value: "false"})
        setIsClickOnSubmitForAddFeedback({value: "true"})
        if (typeOfQuestionFromDatabase.value === "easy") {
            changePoints("decrement", easyAddFedbackPoints)
        } else if (typeOfQuestionFromDatabase.value === "medium") {
            changePoints("decrement", mediumAddFedbackPoints)
        } else if (typeOfQuestionFromDatabase.value === "hard") {
            changePoints("decrement", hardAddFedbackPoints)
        }
    }

    const handleAddFeedback = e => {
        e.preventDefault();
        setUserFeedback({answer: ""})
        AddFeedbackInDatabase();
        setIsClickOnSubmitForAddFeedback({value: "false"})
    }

    const handleChallenge = e => {
        e.preventDefault();
        setStake('')
        setUsernameForSendChallenge({value: ""})
        setMessageForSendChallenge({value: ""})
        setIsSendChallengePressed({value: "false"})
        if (isChallengePressed.value === "false") {
            setIsChallengePressed({value: "true"});
            setShowSendChallengeButton({value: "true"})
        }
    }

    const handleSendChallenge = e => {
        e.preventDefault();
        setIsSendChallengePressed({value: "true"})
        if (usernameForSendChallenge.value === "") {
            setMessageForSendChallenge({value: "Trebuie să introduci username-ul!"})
        } else if (usernameForSendChallenge.value === username.username) {
            setMessageForSendChallenge({value: "Nu te poți provoca pe tine!"})
        } else {

            if (points.points < stake) {
                setMessageForSendChallenge({value: "Nu ai destule puncte"})
            } else {
                //trebuie sa verific daca exista utilizatorul
                //fac direct amandoua
                let today = new Date();
                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date + ' ' + time;
                const data = {
                    id_query: questionData.questionId,
                    who_is_provoked: usernameForSendChallenge.value,
                    who_provoked: username.username,
                    stake: stake,
                    time: dateTime
                }

                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(data),
                };
                let input = IPv4 + "/Licenta/models/AddChallenge.php"
                fetch(
                    input,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setMessageForSendChallenge({value: data.message});
                        if (data.message === "Challenge trimis!") {
                            changePoints("decrement", stake)
                        }
                    })

            }

            setIsChallengePressed({value: "false"})
            setShowSendChallengeButton({value: "false"})
        }
    }

    function changePage() {
        window.location.href = '/login'
    }

    const handleEasyChange = e => {
        //e.preventDefault();
        setIsClickOnSubmitForAddFeedback({value: "false"})
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        setIsDisplayImage({value: "false"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setMessageForSendChallenge({value: ""})
        if (easy.value === "false" && points.points < easyPoints) {
            setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări easy."});
        } else {
            if (easy.value === "true") {
                setEasy({value: "false"});
            } else if (easy.value === "false") {
                setEasy({value: "true"});
            }
            setIsPlayButtonPressed({value: "false"});
            setErrorData({message: ""})
        }

        console.log(easy.value, medium.value, hard.value);
        console.log(errorData.message);

    }
    const handleMediumChange = e => {
        //e.preventDefault();
        setIsClickOnSubmitForAddFeedback({value: "false"})
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setIsDisplayImage({value: "false"})
        setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setMessageForSendChallenge({value: ""})
        if (medium.value === "false" && points.points < mediumPoints) {
            setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări medium."});
        } else {
            if (medium.value === "true") {
                setMedium({value: "false"});
            } else if (medium.value === "false") {
                setMedium({value: "true"});
            }
            setIsPlayButtonPressed({value: "false"});
            setErrorData({message: ""})
        }
        //console.log(easy.value, medium.value, hard.value);
        //console.log(errorData.message);
        //selectQueries();
        //console.log(typeOfQuestionFromDatabase.value)
    }
    const handleHardChange = e => {
        //e.preventDefault();
        setIsClickOnSubmitForAddFeedback({value: "false"})
        setSeconds(120);
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setIsDisplayImage({value: "false"})
        setMessageForSendChallenge({value: ""})
        setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        if (hard.value === "false" && points.points < hardPoints) {
            setErrorData({message: "Nu ai destule puncte pentru a te antrena cu întrebări hard."});
        } else {
            if (hard.value === "true") {
                setHard({value: "false"});
            } else if (hard.value === "false") {
                setHard({value: "true"});
            }
            setIsPlayButtonPressed({value: "false"});
            setErrorData({message: ""})
        }

        console.log(easy.value, medium.value, hard.value);
        console.log(errorData.message);
    }
    const handleShowImage = e => {
        e.preventDefault();
        if (isDisplayImage.value === "false") {
            setIsDisplayImage({value: "true"})
            setTextForImageButton({value: "Ascunde diagrama bazei de date!"})
            if (isImageCreate.value === "false") {
                let img = document.createElement("img");
                img.src = diagram;
                let firstDiv = document.getElementById('diagramImage');
                let divForImage = document.createElement('div');
                divForImage.id = "divForImage";
                firstDiv.append(divForImage);
                let div = document.getElementById("divForImage")
                div.appendChild(img);
                //div.appendChild(img);
                setIsImageCreate({value: "true"})
                
                let img2 = document.createElement("img");
                img2.src = diagram_mobile;
                let firstDiv2 = document.getElementById('diagramImage');
                let divForImage2 = document.createElement('div');
                divForImage2.id = "divForMobileImage";
                firstDiv2.append(divForImage2);
                let div2 = document.getElementById("divForMobileImage");
                div2.appendChild(img2);
                setIsImageCreate({value: "true"});
            }
        } else {
            setIsDisplayImage({value: "false"})
            if (isImageCreate.value === "true") {
                let element = document.getElementById("divForImage");
                element.remove();
                setIsImageCreate({value: "false"})
                
                let element2 = document.getElementById("divForMobileImage");
                element2.remove();
                setIsImageCreate({value: "false"})
            }
            setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        }
    }
    const handleHelpQuestion = e => {
        e.preventDefault();
        if (typeOfQuestionFromDatabase.value !== "hard") {
            //verific daca are suficiente puncte, altfel mesaj
            if (points.points <= 30) {
                setErrorMessageForHelpQuestion({message: "Nu ai suficiente puncte!"})
            } else {
                setIsHelpButtonPressed({value: "true"})
                if (typeOfQuestionFromDatabase.value === "easy") {
                    changePoints("decrement", easyHelpQuestionPoints)
                } else if (typeOfQuestionFromDatabase === "medium") {
                    changePoints("decrement", mediumHelpQuestionPoints)
                }
                if (questionData.var_1 === questionData.correct_answer) {
                    let randomNumber = Math.floor(Math.random() * 4) + 1;
                    while (randomNumber === 1) {
                        randomNumber = Math.floor(Math.random() * 4) + 1;
                    }
                    if (randomNumber === 2) {
                        setDisableFormControlForHelp({var1: false, var2: false, var3: true, var4: true})
                    } else if (randomNumber === 3) {
                        setDisableFormControlForHelp({var1: false, var2: true, var3: false, var4: true})
                    } else if (randomNumber === 4) {
                        setDisableFormControlForHelp({var1: false, var2: true, var3: true, var4: false})
                    }
                } else if (questionData.var_2 === questionData.correct_answer) {
                    let randomNumber = Math.floor(Math.random() * 4) + 1;
                    while (randomNumber === 2) {
                        randomNumber = Math.floor(Math.random() * 4) + 1;
                    }
                    if (randomNumber === 1) {
                        setDisableFormControlForHelp({var1: false, var2: false, var3: true, var4: true})
                    } else if (randomNumber === 3) {
                        setDisableFormControlForHelp({var1: true, var2: false, var3: false, var4: true})
                    } else if (randomNumber === 4) {
                        setDisableFormControlForHelp({var1: true, var2: false, var3: true, var4: false})
                    }
                } else if (questionData.var_3 === questionData.correct_answer) {
                    let randomNumber = Math.floor(Math.random() * 4) + 1;
                    while (randomNumber === 3) {
                        randomNumber = Math.floor(Math.random() * 4) + 1;
                    }
                    if (randomNumber === 1) {
                        setDisableFormControlForHelp({var1: false, var2: true, var3: false, var4: true})
                    } else if (randomNumber === 2) {
                        setDisableFormControlForHelp({var1: true, var2: false, var3: false, var4: true})
                    } else if (randomNumber === 4) {
                        setDisableFormControlForHelp({var1: true, var2: true, var3: false, var4: false})
                    }
                } else if (questionData.var_4 === questionData.correct_answer) {
                    let randomNumber = Math.floor(Math.random() * 4) + 1;
                    while (randomNumber === 4) {
                        randomNumber = Math.floor(Math.random() * 4) + 1;
                    }
                    if (randomNumber === 1) {
                        setDisableFormControlForHelp({var1: false, var2: true, var3: true, var4: false})
                    } else if (randomNumber === 2) {
                        setDisableFormControlForHelp({var1: true, var2: false, var3: true, var4: false})
                    } else if (randomNumber === 3) {
                        setDisableFormControlForHelp({var1: true, var2: true, var3: false, var4: false})
                    }
                }
            }
        } else {
            if (points.points <= 90) {
                setErrorMessageForHelpQuestion({message: "Nu ai suficiente puncte!"})
            } else {
                setIsHelpButtonPressed({value: "true"})
                changePoints("decrement", hardHelpQuestionPoints)
            }
        }
    }
    return (
        <div>
            {!localStorage.getItem("token") && changePage()}
            {localStorage.getItem("token") &&
            <div className="headContent">
                <h2>Alege tipurile de intrebari pe care vrei să le primești!</h2>
                <div className="topContent">
                    <div className="elemInTopContent">
                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={easy.value === "true"}
                                    onChange={handleEasyChange}
                                    name="loading"
                                    color="primary"
                                />
                            }
                            label="Easy"
                        />
                    </div>
                    <div className="elemInTopContent">
                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={medium.value === "true"}
                                    onChange={handleMediumChange}
                                    name="loading"
                                    color="primary"
                                />
                            }
                            label="Medium"
                        />
                    </div>
                    <div className="elemInTopContent">
                        <FormControlLabel
                            sx={{
                                display: 'block',
                            }}
                            control={
                                <Switch
                                    checked={hard.value === "true"}
                                    onChange={handleHardChange}
                                    name="loading"
                                    color="primary"
                                />
                            }
                            label="Hard"
                        />
                    </div>
                </div>
                {isPlayButtonPressed.value === "false" && (easy.value === "true" || medium.value === "true" || hard.value === "true") &&
                <div className="buttonPlay">
                    <button className="btn btn-primary btn-block"
                            onClick={handlePlayClick}>Play
                    </button>
                </div>}
                {errorData.message && <div><h3>{errorData.message}</h3></div>}
                {isPlayButtonPressed.value === "true" && (typeOfQuestionFromDatabase.value === "medium" || typeOfQuestionFromDatabase.value === "hard") &&
                <div>
                    <form onSubmit={handleShowImage}>
                        <div className="buttonLogin" id="childChangeDetails">
                            <button className="btn btn-primary btn-block">{textForImageButton.value}</button>
                        </div>
                    </form>
                </div>}
                <div className="centerContent">
                    <div id="diagramImage">

                    </div>
                </div>
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value === "easy" && expiredTime.value === "true" && submitForm.value === "true" &&
                <div className="centerContent">
                    <h3 id="message">Timp expirat, ai pierdut {easyPoints} puncte!</h3>
                </div>}
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value === "medium" && expiredTime.value === "true" && submitForm.value === "true" &&
                <div className="centerContent">
                    <h3 id="message">Timp expirat, ai pierdut {mediumPoints} puncte!</h3>
                </div>}
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value === "hard" && expiredTime.value === "true" && submitForm.value === "true" &&
                <div className="centerContent">
                    <h3 id="message">Timp expirat, ai pierdut {hardPoints} puncte!</h3>
                </div>}
                {isPlayButtonPressed.value === "true" && expiredTime.value === "false" &&
                <div className="centerContent">
                    <button className="btn btn-primary btn-block">Timp
                        rămas <TimerIcon/>: {seconds} secunde
                    </button>
                </div>}
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value !== "hard" &&
                <div>
                    <div className="itemCenterContent">
                        <p> {questionData.question} </p>
                        <form style={{width: "auto"}} onSubmit={handleSubmit}>
                            <FormControl>
                                {/*<FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>*/}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel checked={checked.var_1} value="var_1" control={<Radio/>}
                                                      disabled={disableFormControlForHelp.var1}
                                                      onChange={handleChange}
                                                      label={questionData.var_1}/>
                                    <FormControlLabel checked={checked.var_2} value="var_2" control={<Radio/>}
                                                      disabled={disableFormControlForHelp.var2}
                                                      onChange={handleChange}
                                                      label={questionData.var_2}/>
                                    <FormControlLabel checked={checked.var_3} value="var_3" control={<Radio/>}
                                                      disabled={disableFormControlForHelp.var3}
                                                      onChange={handleChange}
                                                      label={questionData.var_3}/>
                                    <FormControlLabel checked={checked.var_4} value="var_4" control={<Radio/>}
                                                      disabled={disableFormControlForHelp.var4}
                                                      onChange={handleChange}
                                                      label={questionData.var_4}/>
                                </RadioGroup>
                                <div className="buttonSubmit">
                                    <div>
                                        {!submitForm.value &&
                                        <button disabled={submitForm.value}
                                                className="btn btn-primary btn-block">Submit
                                        </button>}

                                        {submitForm.value &&
                                        <button className="btn btn-primary btn-block"
                                                onClick={handleNextButton}>Next</button>}
                                    </div>
                                </div>

                                <div className="errorSubmit">
                                    {submitMessage.message}
                                </div>
                            </FormControl>
                        </form>
                    </div>

                </div>}
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value === "hard" &&
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
                                    <div>
                                        {!submitForm.value &&
                                        <button disabled={submitForm.value}
                                                className="btn btn-primary btn-block">Submit
                                        </button>}

                                        {submitForm.value &&
                                        <button className="btn btn-primary btn-block"
                                                onClick={handleNextButton}>Next</button>}
                                    </div>
                                </div>
                                <div className="errorSubmit">
                                    {submitMessage.message}
                                </div>
                            </Paper>
                        </div>
                    </form>
                </div>
                }
                {isPlayButtonPressed.value === "true" &&
                <div className="justified">
                    <p>Număr de rezolvări: {questionData.number_of_answers}</p>
                </div>}
                <div className="elements">
                    <div className="elementInElements">
                        {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "false" && typeOfQuestionFromDatabase.value === "easy" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleHelpQuestion}><SupportIcon/> Ajutor întrebare
                                (-{easyHelpQuestionPoints} puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "false" && typeOfQuestionFromDatabase.value === "medium" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleHelpQuestion}><SupportIcon/> Ajutor întrebare
                                (-{mediumHelpQuestionPoints} de puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "false" && typeOfQuestionFromDatabase.value === "hard" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleHelpQuestion}><SupportIcon/> Ajutor întrebare
                                (-{hardHelpQuestionPoints} de puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "true" && typeOfQuestionFromDatabase.value === "hard" &&
                        <div className="justified">
                            <h3>Cuvinte cheie: {stringForHardQuestionHelp.value}</h3>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "true" && errorMessageForHelpQuestion.message &&
                        <div className="justified">
                            <h3>{errorMessageForHelpQuestion.message}</h3>
                        </div>}
                    </div>
                    <div className="elementInElements">
                        {isPlayButtonPressed.value === "true" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleChallenge}>Provoacă un utilizator <PersonIcon/>
                                <ForwardToInboxIcon/>
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isChallengePressed.value === "true" &&
                        <div className="justified">
                            <div className="ElementForChallenge">
                                <div className="itemForElementForChallenge">
                                    <TextareaAutosize
                                        id="username"
                                        aria-label="empty textarea"
                                        placeholder="Write here username"
                                        minRows={1}
                                        style={{width: 200}}
                                        value={usernameForSendChallenge.value}
                                        onChange={e => setUsernameForSendChallenge({value: e.target.value})}
                                    />
                                </div>
                                <div className="itemForElementForChallenge">
                                    <Box sx={{minWidth: 120}}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">BET</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={stake}
                                                label="stake"
                                                onChange={handleSetStake}
                                            >
                                                <MenuItem value={''}>None</MenuItem>
                                                <MenuItem value={25}>25 <MonetizationOnIcon/></MenuItem>
                                                <MenuItem value={50}>50 <MonetizationOnIcon/></MenuItem>
                                                <MenuItem value={150}>150 <MonetizationOnIcon/></MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            </div>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isChallengePressed.value === "true" && stake &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleSendChallenge}>Send for {stake} <MonetizationOnIcon/>
                            </button>
                        </div>}

                        {isPlayButtonPressed.value === "true" && isSendChallengePressed.value === "true" && messageForSendChallenge.value &&
                        <div className="justified">
                            <h3>{messageForSendChallenge.value}</h3>
                        </div>}
                    </div>
                    <div className="elementInElements">
                        {isPlayButtonPressed.value === "true" && isClickOnSubmitForAddFeedback.value === "false" && typeOfQuestionFromDatabase.value === "easy" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonForAddFeedback}>Adauga feedback
                                (-{easyAddFedbackPoints} puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isClickOnSubmitForAddFeedback.value === "false" && typeOfQuestionFromDatabase.value === "medium" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonForAddFeedback}>Adauga feedback
                                (-{mediumAddFedbackPoints} puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isClickOnSubmitForAddFeedback.value === "false" && typeOfQuestionFromDatabase.value === "hard" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonForAddFeedback}>Adauga feedback (-{hardAddFedbackPoints} de
                                puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && isClickOnSubmitForAddFeedback.value === "true" &&
                        <div>
                            <div className="justified">
                                <TextareaAutosize
                                    id="idFeedbackUser"
                                    aria-label="empty textarea"
                                    placeholder="Write your feedback here"
                                    minRows={3}
                                    style={{width: 300}}
                                    value={userFeedback.answer}
                                    onChange={e => setUserFeedback({answer: e.target.value})}
                                />
                            </div>
                            <div className="justified">
                                <button className="btn btn-primary btn-block"
                                        onClick={handleAddFeedback}>TRIMITE FEEDBACK!
                                </button>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="elementInElements">
                        {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "false" && typeOfQuestionFromDatabase.value === "easy" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonShowFeedback}>Vezi feedback-urile despre intrebare
                                (-{easyShowFedbackPoints} puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "false" && typeOfQuestionFromDatabase.value === "medium" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonShowFeedback}>Vezi feedback-urile despre intrebare
                                (-{mediumShowFedbackPoints} puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "false" && typeOfQuestionFromDatabase.value === "hard" &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonShowFeedback}>Vezi feedback-urile despre intrebare
                                (-{hardShowFedbackPoints} de puncte)
                            </button>
                        </div>}
                        {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "true"
                        &&
                        <div className="justified">
                            <button className="btn btn-primary btn-block"
                                    onClick={handleButtonShowFeedback}>Ascunde feedback-urile despre intrebare
                            </button>

                        </div>}
                    </div>
                </div>
                {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "true" &&
                <div className="justifiedFeedback">
                    <div className="elemJustifiedFeedback">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </div>
                </div>}
            </div>}
        </div>
    )
}
