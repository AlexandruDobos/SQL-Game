import React, {useState} from 'react';
import '../css/training.css'
import {
    FormControl,
    FormControlLabel,
    FormLabel, Grid, InputLabel, MenuItem,
    Paper,
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
import diagram from "../images/studentiDiagram.svg";

export default function Training() {

    const [state, setState] = useState({email: ""});
    const [username, setUsername] = useState({username: ""})
    const [points, setPoints] = useState({points: ""})
    let easyPoints = 5;
    let mediumPoints = 10;
    let hardPoints = 20;
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
    const [easy, setEasy] = React.useState({value: "true"});
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
        },
        {
            field: 'user_who_send',
            headerName: 'User',
            description: 'Username-ul celui ce a lasat feedback-ul',
            sortable: false,
            editable: false,
            width: 160,
        },
        {
            field: 'feedback',
            headerName: 'Feedback',
            description: 'Parerea utilizatorului despre intrebare',
            sortable: false,
            editable: false,
            width: 160,
        }];


    const [seconds, setSeconds] = useState({value: ""});
    const [expiredTime, setIsExpiredTime] = useState({value: "false"})
    const [viewSeconds, setViewSeconds] = useState({value: ""})
    const [flag, setFlag] = useState({value: "false"})

    const [isDisplayImage, setIsDisplayImage] = useState({value: "false"})
    const [textForImageButton, setTextForImageButton] = useState({value: "Afișează diagrama tabelei!"})
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
                console.log(data.difficulty)
                console.log(data.correct_answer)
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

    React.useEffect(() => {
        decodeJWT();
        selectQueries();
    }, [isPlayButtonPressed.value]);


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
                        //changePoints("add");
                    } else {
                        if (dates.message === "Raspuns gresit!") {
                            setSubmitMessage({message: "Raspuns gresit, ai pierdut " + hardPoints + " puncte!"})
                            changePoints("decrement", hardPoints);
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
        selectQueries();
    }

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
        setIsPlayButtonPressed({value: "true"})
        /*console.log(questionData.questionId)
        console.log(questionData.question)
        console.log(questionData.var_1)
        console.log(questionData.var_2)
        console.log(questionData.var_3)
        console.log(questionData.var_4)
        console.log(questionData.correct_answer)*/
        selectQueries();
    }

    const handleButtonShowFeedback = e => {
        e.preventDefault();
        setIsSendChallengePressed({value: "false"})
        if (buttonShowFeedback.value === "false") {
            setButtonShowFeedback({value: "true"})
            changePoints("decrement", 50)
        } else {
            setButtonShowFeedback({value: "false"})
        }
    }

    const handleButtonForAddFeedback = e => {
        e.preventDefault();
        setIsSendChallengePressed({value: "false"})
        setIsClickOnSubmitForAddFeedback({value: "true"})
        changePoints("decrement", 25)
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
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setTextForImageButton({value: "Afișează diagrama tabelei!"})
        setIsDisplayImage({value: "false"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setMessageForSendChallenge({value: ""})
        if (easy.value === "true" && medium.value === "false" && hard.value === "false") {
            setErrorData({message: "Nu poti dezactiva toate optiunile"});
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
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setIsDisplayImage({value: "false"})
        setTextForImageButton({value: "Afișează diagrama tabelei!"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setMessageForSendChallenge({value: ""})
        if (easy.value === "false" && medium.value === "true" && hard.value === "false") {
            setErrorData({message: "Nu poti dezactiva toate optiunile"});
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
        setDisableFormControlForHelp({var1: false, var2: false, var3: false, var4: false})
        setErrorMessageForHelpQuestion({message: ""})
        setIsDisplayImage({value: "false"})
        setMessageForSendChallenge({value: ""})
        setTextForImageButton({value: "Afișează diagrama tabelei!"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        if (easy.value === "false" && medium.value === "false" && hard.value === "true") {
            setErrorData({message: "Nu poti dezactiva toate optiunile"});
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
            setTextForImageButton({value: "Ascunde diagrama tabelei!"})
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
            }
        } else {
            setIsDisplayImage({value: "false"})
            if (isImageCreate.value === "true") {
                let element = document.getElementById("divForImage");
                element.remove();
                setIsImageCreate({value: "false"})
            }
            setTextForImageButton({value: "Afișează diagrama tabelei!"})
        }
    }
    const handleHelpQuestion = e => {
        e.preventDefault();
        if (typeOfQuestionFromDatabase.value !== "hard") {
            //verific daca are suficiente puncte, altfel mesaj
            if (points.points <= 50) {
                setErrorMessageForHelpQuestion({message: "Nu ai suficiente puncte!"})
            } else {
                setIsHelpButtonPressed({value: "true"})
                changePoints("decrement", 50)
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
            if (points.points <= 100) {
                setErrorMessageForHelpQuestion({message: "Nu ai suficiente puncte!"})
            } else {
                setIsHelpButtonPressed({value: "true"})
                changePoints("decrement", 100)
            }
        }
    }
    return (
        <div className="centerContent">
            {!localStorage.getItem("token") && changePage()}
            {localStorage.getItem("token") &&
            <div>
                <h2>Alege tipurile de intrebari pe care vrei să le primești!</h2>
                <div className="topContent">
                    <div>
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
                    <div>
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
                    <div>
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
                {isPlayButtonPressed.value === "false" &&
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
                {isPlayButtonPressed.value === "true" && expiredTime.value === "false" &&
                <div>
                    <button className="btn btn-primary btn-block">Timp
                        rămas <TimerIcon/>: {viewSeconds.value} secunde
                    </button>
                </div>}
                {isPlayButtonPressed.value === "true" && typeOfQuestionFromDatabase.value !== "hard" &&
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
                                        value = {hardQuestionResponse.value}
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
                {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "false" && typeOfQuestionFromDatabase.value !== "hard" &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleHelpQuestion}><SupportIcon/> Ajutor întrebare (-50 de puncte)
                    </button>
                </div>}
                {isPlayButtonPressed.value === "true" && isHelpButtonPressed.value === "false" && typeOfQuestionFromDatabase.value === "hard" &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleHelpQuestion}><SupportIcon/> Ajutor întrebare (-100 de puncte)
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
                {isPlayButtonPressed.value === "true" &&
                <div className="justified">
                    <p>Număr de rezolvări: {questionData.number_of_answers}</p>
                </div>}
                {isPlayButtonPressed.value === "true" &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleChallenge}>Provoacă un utilizator <PersonIcon/> <ForwardToInboxIcon/>
                    </button>
                </div>}
                {isPlayButtonPressed.value === "true" && isChallengePressed.value === "true" &&
                <div>
                    <div className="justified">
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
                    <div className="justified">
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

                {isPlayButtonPressed.value === "true" && isClickOnSubmitForAddFeedback.value === "false" &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleButtonForAddFeedback}>Adauga feedback (-25 de puncte)
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
                {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "false" &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleButtonShowFeedback}>Vezi feedback-urile despre intrebare (-50 de
                        puncte)
                    </button>
                </div>}
                {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "true"
                &&
                <div className="justified">
                    <button className="btn btn-primary btn-block"
                            onClick={handleButtonShowFeedback}>Ascunde feedback-urile despre intrebare
                    </button>

                </div>}
                {isPlayButtonPressed.value === "true" && buttonShowFeedback.value === "true" &&
                <div className="justified" style={{height: 400, width: '100%'}}>
                    <DataGrid className="justified"
                              rows={rows}
                              columns={columns}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              disableSelectionOnClick
                    />
                </div>}
            </div>}
        </div>
    )
}
