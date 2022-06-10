import React, {useEffect, useState} from 'react';
import '../css/game.css'
import {
    createStyles,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextareaAutosize,
    TextField
} from "@mui/material";
import IPv4 from "../index";
import {Paper} from "@mui/material";
import {type} from "@testing-library/user-event/dist/type";
import Typography from "@mui/material/Typography";
import diagram from "../images/structura_tabele.svg";
import TimerIcon from "@mui/icons-material/Timer";
import diagram_mobile from "../images/diagrama_tabele_telefon.svg";

export default function Game() {

    const [state, setState] = useState({user: ""});
    const [username, setUsername] = useState({username: ""})
    const [points, setPoints] = useState({points: ""})
    const [questionData, setQuestionData] = useState({
        question: "",
        var_1: "",
        var_2: "",
        var_3: "",
        var_4: "",
        correct_answer: ""
    })
    const [submitForm, setSubmitForm] = useState({value: false});
    const [selectedAnswer0, setSelectedAnswer0] = useState({answer: ""});
    const [selectedAnswer1, setSelectedAnswer1] = useState({answer: ""});
    const [selectedAnswer2, setSelectedAnswer2] = useState({answer: ""});
    const [selectedAnswer3, setSelectedAnswer3] = useState({answer: ""});
    const [selectedAnswer4, setSelectedAnswer4] = useState({answer: ""});
    const [selectedAnswer5, setSelectedAnswer5] = useState({answer: ""});
    const [selectedAnswer6, setSelectedAnswer6] = useState({answer: ""});
    const [selectedAnswer7, setSelectedAnswer7] = useState({answer: ""});
    const [selectedAnswer8, setSelectedAnswer8] = useState({answer: ""});
    const [selectedAnswer9, setSelectedAnswer9] = useState({answer: ""});
    const [checked0, setChecked0] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked1, setChecked1] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked2, setChecked2] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked3, setChecked3] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked4, setChecked4] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked5, setChecked5] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked6, setChecked6] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked7, setChecked7] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked8, setChecked8] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [checked9, setChecked9] = useState({var_1: false, var_2: false, var_3: false, var_4: false});

    const [hardQuestionResponse1, setHardQuestionResponse1] = useState({answer: ""});
    const [hardQuestionResponse2, setHardQuestionResponse2] = useState({answer: ""});
    const [hardQuestionResponse3, setHardQuestionResponse3] = useState({answer: ""});
    const [hardQuestion1ResponseValue, setHardQuestion1ResponseValue] = useState();
    const [hardQuestion2ResponseValue, setHardQuestion2ResponseValue] = useState();
    const [hardQuestion3ResponseValue, setHardQuestion3ResponseValue] = useState();
    const [clicked, setClicked] = useState({value: false})
    const [typeOfLevel, setTypeOfLevel] = useState({value: ""})
    const [necessaryPoints, setNecessaryPoints] = useState({value: ""})
    const [numberOfPointsCanYouWin, setNumberOfPointsCanYouWin] = useState({value: ""})
    const [isClickedOrder, setIsClickedOrder] = useState({value: false})
    const [isClickedOrderYes, setIsClickedOrderYes] = useState({value: false})
    const [isSubmittedForm, setIsSubmittedForm] = useState({value: false})
    const [submittedDetails, setSubmittedDetails] = useState({
        numberOfCorrectResponses: 0,
        numberOfWrongResponses: 0,
        numberOfEmptyResponses: 0,
        numberOfPointsWin: 0,
        timeRemaining: ""
    })
    const [hardNumberOfCorrectResponses, setHardNumberOfCorrectResponses] = useState(0)
    const [hardNumberOfWrongResponses, setHardNumberOfWrongResponses] = useState(0)
    const [hardNumberOfEmptyResponses, setHardNumberOfEmptyResponses] = useState(0)
    const [easyQuestions, setEasyQuestions] = useState({});
    const [mediumQuestions, setMediumQuestions] = useState({});
    const [hardQuestions, setHardQuestions] = useState({});

    const [isDisplayImage, setIsDisplayImage] = useState({value: "false"})
    const [textForImageButton, setTextForImageButton] = useState({value: "Afișează diagrama bazei de date!"})
    const [isImageCreate, setIsImageCreate] = useState({value: "false"});
    const [seconds, setSeconds] = useState(5);
    const [expiredTime, setIsExpiredTime] = useState({value: "false"})
    const [variable, setVariable] = useState(0)

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
                        user: dates["JWT"]["data"]["email"]
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


    React.useEffect(() => {
        decodeJWT();
    }, []);

    function changePoints(parameter, numberOfPoints) {
        if (parameter === "add") {
            console.log("puncte: " + submittedDetails.numberOfPointsWin)
            if (numberOfPoints > 0) {
                const data = {
                    email: state.user,
                    numberOfPoints: numberOfPoints
                }
                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify(data)
                }
                let input = IPv4 + "/Licenta/models/GameCreateTokenAddPoints.php"
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
        } else if (parameter === "decrement") {
            const data = {
                email: state.user,
                numberOfPoints: necessaryPoints.value
            }
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            }
            let input = IPv4 + "/Licenta/models/GameCreateTokenDecrementPoints.php"
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

    function EasyButtonAction() {
        setClicked({value: true})
        setIsClickedOrder({value: false})
        setIsClickedOrderYes({value: false})
        setTypeOfLevel({value: "EASY"})
        setIsSubmittedForm({value: false})
        setNecessaryPoints({value: 50})
        setNumberOfPointsCanYouWin({value: 250})
        setVariable(0)
        changeValuesToDefault();

    }

    function MediumButtonAction() {
        setClicked({value: true})
        setIsClickedOrder({value: false})
        setIsClickedOrderYes({value: false})
        setTypeOfLevel({value: "MEDIUM"})
        setIsSubmittedForm({value: false})
        setNecessaryPoints({value: 100})
        setNumberOfPointsCanYouWin({value: 500})
        setVariable(0)
        changeValuesToDefault();
    }

    function HardButtonAction() {
        setClicked({value: true})
        setIsClickedOrder({value: false})
        setIsClickedOrderYes({value: false})
        setTypeOfLevel({value: "HARD"})
        setIsSubmittedForm({value: false})
        setNecessaryPoints({value: 200})
        setNumberOfPointsCanYouWin({value: 600})
        setVariable(0)
        setHardNumberOfCorrectResponses(0)
        setHardNumberOfWrongResponses(0)
        setHardNumberOfWrongResponses(0)
        changeValuesToDefault();
    }

    function GoToTrainingPage() {
        window.location.href = '/training'
    }

    function GoToAddQuestionPage() {
        window.location.href = '/addquestion'
    }

    function ClickedOrder() {
        setIsClickedOrder({value: true})
        if (typeOfLevel.value === "EASY") {
            const requestOptions = {
                method: "GET"
            };
            let input = IPv4 + "/Licenta/models/SelectLevelEasyQuestion.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    //this.props.setUser(dates.data.email);
                    setEasyQuestions(dates.message)
                    console.log(dates.message)
                    //console.log(dates[1]["id"])
                })
        } else if (typeOfLevel.value === "MEDIUM") {
            const requestOptions = {
                method: "GET"
            };
            let input = IPv4 + "/Licenta/models/SelectLevelMediumQuestion.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    //this.props.setUser(dates.data.email);
                    setMediumQuestions(dates.message)
                    console.log(dates.message)
                    //console.log(dates[1]["id"])
                })
        } else if (typeOfLevel.value === "HARD") {
            const requestOptions = {
                method: "GET"
            };
            let input = IPv4 + "/Licenta/models/SelectLevelHardQuestion.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    //this.props.setUser(dates.data.email);
                    setHardQuestions(dates.message)
                    console.log(dates.message)
                    //console.log(dates[1]["id"])
                })
        }
    }

    function ConfirmOrderYes() {
        setIsExpiredTime({value: "false"});
        if (typeOfLevel.value === "EASY") {
            setSeconds(300);
        } else if (typeOfLevel.value === "MEDIUM") {
            setSeconds(450);
        } else if (typeOfLevel.value === "HARD") {
            setSeconds(360);
        }
        changePoints("decrement", null);
        setClicked({value: false})
        setIsClickedOrderYes({value: true})
        setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        setIsDisplayImage({value: "false"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
    }

    function ConfirmOrderNo() {
        setClicked({value: false})
    }

    function changeValuesToDefault() {
        setHardNumberOfWrongResponses(0)
        setHardNumberOfEmptyResponses(0)
        setTextForImageButton({value: "Afișează diagrama bazei de date!"})
        setIsDisplayImage({value: "false"})
        if (isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setChecked0({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer0({answer: ""})
        setChecked1({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer1({answer: ""})
        setChecked2({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer2({answer: ""})
        setChecked3({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer3({answer: ""})
        setChecked4({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer4({answer: ""})
        setChecked5({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer5({answer: ""})
        setChecked6({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer6({answer: ""})
        setChecked7({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer7({answer: ""})
        setChecked8({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer8({answer: ""})
        setChecked9({var_1: false, var_2: false, var_3: false, var_4: false});
        setSelectedAnswer9({answer: ""})
        setHardQuestionResponse1({answer: ""})
        setHardQuestionResponse2({answer: ""})
        setHardQuestionResponse3({answer: ""})
        setHardQuestion1ResponseValue();
        setHardQuestion2ResponseValue();
        setHardQuestion3ResponseValue();
    }

    function checkHardQuestion1(userResponse) {
        if (userResponse === "") {
            setHardNumberOfEmptyResponses(hardNumberOfEmptyResponses + 1)
        } else {
            console.log(userResponse);
            const data = {
                correct_answer: hardQuestions[0]["response"],
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
                    //console.log(index);
                    if (dates.message === "Raspuns corect!") {
                        setHardQuestion1ResponseValue(true);
                    } else {
                        setHardQuestion1ResponseValue(false);
                    }
                })
        }
    }

    function checkHardQuestion2(userResponse) {
        if (userResponse === "") {
            setHardNumberOfEmptyResponses(hardNumberOfEmptyResponses + 1)
        } else {
            console.log(userResponse);
            const data = {
                correct_answer: hardQuestions[1]["response"],
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
                    //console.log(index);
                    if (dates.message === "Raspuns corect!") {
                        setHardQuestion2ResponseValue(true);
                    } else {
                        setHardQuestion2ResponseValue(false);
                    }
                })
        }
    }

    function checkHardQuestion3(userResponse) {
        if (userResponse === "") {
            setHardNumberOfEmptyResponses(hardNumberOfEmptyResponses + 1)
        } else {
            console.log(userResponse);
            const data = {
                correct_answer: hardQuestions[2]["response"],
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
                    //console.log(index);
                    if (dates.message === "Raspuns corect!") {

                        setHardQuestion3ResponseValue(true);
                    } else {
                        setHardQuestion3ResponseValue(false);
                    }
                })
        }
    }

    function CreateStatisticsForHardQuestion() {
        setVariable(variable + 1)
        let index = 0;
        if (index === 0) {
            //console.log("Indexul este: ", index)
            if (hardQuestion1ResponseValue === true) {
                setHardNumberOfCorrectResponses(hardNumberOfCorrectResponses + 1);
                //console.log("Valoarea lui hardNumberOfCorrectResponses este: ", hardNumberOfCorrectResponses)
                setHardQuestion1ResponseValue()
            }
            index++;
        }
        if (index === 1) {
            //console.log("Indexul este: ", index)
            if (hardQuestion2ResponseValue === true) {
                setHardNumberOfCorrectResponses(hardNumberOfCorrectResponses + 1);
                //console.log("Valoarea lui hardNumberOfCorrectResponses este: ", hardNumberOfCorrectResponses)
                setHardQuestion1ResponseValue()
            }
            index++;
        }
        if (index === 2) {
            //console.log("Indexul este: ", index)
            if (hardQuestion3ResponseValue === true) {
                setHardNumberOfCorrectResponses(hardNumberOfCorrectResponses + 1);
                //console.log("Valoarea lui hardNumberOfCorrectResponses este: ", hardNumberOfCorrectResponses)
                setHardQuestion1ResponseValue()
            }
            index++;
        }
    }

    const handleChange = e => {
        e.preventDefault();
        console.log(e.target.value);
        //const number = parseInt(e.target.value.slice(-1));
        const number = parseInt(e.target.value.substring(0, 9).slice(-1))
        let value = e.target.value.slice(-5);
        console.log(value);
        console.log(number);
        switch (number) {
            case 0: {
                setChecked0(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer0({answer: value})
            }
                break;
            case 1: {
                setChecked1(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer1({answer: value})
            }
                break;
            case 2: {
                setChecked2(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer2({answer: value})
            }
                break;
            case 3: {
                setChecked3(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer3({answer: value})
            }
                break;
            case 4: {
                setChecked4(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer4({answer: value})
            }
                break;
            case 5: {
                setChecked5(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer5({answer: value})
            }
                break;
            case 6: {
                setChecked6(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer6({answer: value})
            }
                break;
            case 7: {
                setChecked7(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer7({answer: value})
            }
                break;
            case 8: {
                setChecked8(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer8({answer: value})
            }
                break;
            case 9: {
                setChecked9(() => {
                    return {var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}
                });
                setSelectedAnswer9({answer: value})
            }
                break;
        }

    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmittedForm({value: true})
        setIsDisplayImage({value: "false"})
        setIsClickedOrderYes({value: "false"})
        //setTextForImageButton({value: "Afișează diagrama tabelei!"})
        setIsExpiredTime({value: "false"});
        setSeconds(0);
        if (typeOfLevel.value === "EASY") {
            //trebuie să verific câte răspunsuri a avut corecte
            let index = 0;
            let emptyResponses = 0;
            if (selectedAnswer0.answer === easyQuestions[0]["correct_answer"]) index++; else if (!selectedAnswer0.answer) emptyResponses++;
            if (selectedAnswer1.answer === easyQuestions[1]["correct_answer"]) index++; else if (!selectedAnswer1.answer) emptyResponses++;
            if (selectedAnswer2.answer === easyQuestions[2]["correct_answer"]) index++; else if (!selectedAnswer2.answer) emptyResponses++;
            if (selectedAnswer3.answer === easyQuestions[3]["correct_answer"]) index++; else if (!selectedAnswer3.answer) emptyResponses++;
            if (selectedAnswer4.answer === easyQuestions[4]["correct_answer"]) index++; else if (!selectedAnswer4.answer) emptyResponses++;
            if (selectedAnswer5.answer === easyQuestions[5]["correct_answer"]) index++; else if (!selectedAnswer5.answer) emptyResponses++;
            if (selectedAnswer6.answer === easyQuestions[6]["correct_answer"]) index++; else if (!selectedAnswer6.answer) emptyResponses++;
            if (selectedAnswer7.answer === easyQuestions[7]["correct_answer"]) index++; else if (!selectedAnswer7.answer) emptyResponses++;
            if (selectedAnswer8.answer === easyQuestions[8]["correct_answer"]) index++; else if (!selectedAnswer8.answer) emptyResponses++;
            if (selectedAnswer9.answer === easyQuestions[9]["correct_answer"]) index++; else if (!selectedAnswer9.answer) emptyResponses++;
            setSubmittedDetails({
                numberOfCorrectResponses: index,
                numberOfWrongResponses: 10 - index - emptyResponses,
                numberOfEmptyResponses: emptyResponses,
                numberOfPointsWin: (index * numberOfPointsCanYouWin.value / 10)
            })
            changePoints("add", (index * numberOfPointsCanYouWin.value / 10));
        } else if (typeOfLevel.value === "MEDIUM") {
            //trebuie să verific câte răspunsuri a avut corecte
            let index = 0;
            let emptyResponses = 0;
            if (selectedAnswer0.answer === mediumQuestions[0]["correct_answer"]) index++; else if (!selectedAnswer0.answer) emptyResponses++;
            if (selectedAnswer1.answer === mediumQuestions[1]["correct_answer"]) index++; else if (!selectedAnswer1.answer) emptyResponses++;
            if (selectedAnswer2.answer === mediumQuestions[2]["correct_answer"]) index++; else if (!selectedAnswer2.answer) emptyResponses++;
            if (selectedAnswer3.answer === mediumQuestions[3]["correct_answer"]) index++; else if (!selectedAnswer3.answer) emptyResponses++;
            if (selectedAnswer4.answer === mediumQuestions[4]["correct_answer"]) index++; else if (!selectedAnswer4.answer) emptyResponses++;
            if (selectedAnswer5.answer === mediumQuestions[5]["correct_answer"]) index++; else if (!selectedAnswer5.answer) emptyResponses++;
            if (selectedAnswer6.answer === mediumQuestions[6]["correct_answer"]) index++; else if (!selectedAnswer6.answer) emptyResponses++;
            if (selectedAnswer7.answer === mediumQuestions[7]["correct_answer"]) index++; else if (!selectedAnswer7.answer) emptyResponses++;
            if (selectedAnswer8.answer === mediumQuestions[8]["correct_answer"]) index++; else if (!selectedAnswer8.answer) emptyResponses++;
            if (selectedAnswer9.answer === mediumQuestions[9]["correct_answer"]) index++; else if (!selectedAnswer9.answer) emptyResponses++;
            setSubmittedDetails({
                numberOfCorrectResponses: index,
                numberOfWrongResponses: 10 - index - emptyResponses,
                numberOfEmptyResponses: emptyResponses,
                numberOfPointsWin: (index * numberOfPointsCanYouWin.value / 10)
            })
            changePoints("add", (index * numberOfPointsCanYouWin.value / 10));
        } else if (typeOfLevel.value === "HARD") {
            console.log("response1 " + hardQuestionResponse1.answer)
            console.log("response2 " + hardQuestionResponse2.answer)
            console.log("response3 " + hardQuestionResponse3.answer)
            let index = 0;
            if (index === 0) {
                checkHardQuestion1(hardQuestionResponse1.answer)
                index++;
            }
            if (index === 1) {
                checkHardQuestion2(hardQuestionResponse2.answer)
                index++;
            }
            if (index === 2) {
                checkHardQuestion3(hardQuestionResponse3.answer)
                index++;
            }

            if (index === 3) {
                CreateStatisticsForHardQuestion();
            }

            console.log(index);

        }

    }

    React.useEffect(() => {
        if (hardQuestion1ResponseValue === true || hardQuestion2ResponseValue === true || hardQuestion3ResponseValue === true) {
            CreateStatisticsForHardQuestion();
        }
        //console.log("variable este: ", variable)

    }, [hardQuestion1ResponseValue, hardQuestion2ResponseValue, hardQuestion3ResponseValue])

    React.useEffect(() => {
        if (hardQuestion1ResponseValue === false || hardQuestion2ResponseValue === false || hardQuestion3ResponseValue === false) {
            if (hardQuestion1ResponseValue === false) {
                setHardNumberOfWrongResponses(hardNumberOfWrongResponses + 1);
                setHardQuestion1ResponseValue()
            }
            if (hardQuestion2ResponseValue === false) {
                setHardNumberOfWrongResponses(hardNumberOfWrongResponses + 1);
                setHardQuestion2ResponseValue()
            }
            if (hardQuestion3ResponseValue === false) {
                setHardNumberOfWrongResponses(hardNumberOfWrongResponses + 1);
                setHardQuestion3ResponseValue()
            }
        }
        //console.log("variable este: ", variable)
        if (hardQuestion1ResponseValue !== true && hardQuestion1ResponseValue !== false &&
            hardQuestion2ResponseValue !== true && hardQuestion2ResponseValue !== false &&
            hardQuestion3ResponseValue !== true && hardQuestion3ResponseValue !== false) {
            changePoints("add", hardNumberOfCorrectResponses * (numberOfPointsCanYouWin.value / 3))
        }
    }, [hardQuestion1ResponseValue, hardQuestion2ResponseValue, hardQuestion3ResponseValue])

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

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((s) => s - 1);
            if (seconds < 1) {
                setIsExpiredTime({value: "true"});
                setSubmitForm({value: true});
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div className="principal">
            <div className="title">
                <h2>{username.username} Test Page</h2>
            </div>
            <div className="component">
                <div className="componentMenu">
                    <div className="buttonLevelGame">
                        <button className="btn btn-primary btn-block" onClick={EasyButtonAction}>Easy</button>
                    </div>
                    <div className="buttonLevelGame">
                        <button className="btn btn-primary btn-block" onClick={MediumButtonAction}>Medium</button>
                    </div>
                    <div className="buttonLevelGame">
                        <button className="btn btn-primary btn-block" onClick={HardButtonAction}>Hard</button>
                    </div>
                </div>

                {!clicked.value && !isClickedOrderYes.value && <div className="firstDiv">
                    <div className="divForFirstDiv"><p id="pForFirstDiv">Selectează tipul de test și hai să începem!</p>
                    </div>
                </div>}

                <div className="specialDiv">
                    {isClickedOrderYes.value === true && expiredTime.value === "false" &&
                    <div className="centerContent">
                        <button className="btn btn-primary btn-block">Timp
                            rămas <TimerIcon/>: {seconds} secunde
                        </button>
                    </div>}
                    {isClickedOrderYes.value === true && expiredTime.value === "true" && submitForm.value === false &&
                    <div>
                        <h3>Timpul a expirat!</h3>
                    </div>}
                    {clicked.value && points.points > necessaryPoints.value &&
                    <div className="firstDiv">
                        <p id="pForMessages"> Ești gata să începi un joc de tip {typeOfLevel.value}. Acest tip de joc te
                            va
                            costa {necessaryPoints.value} puncte și poți câștiga un număr
                            de {numberOfPointsCanYouWin.value} de puncte dacă-l finalizezi.</p>
                        <div className="buttonSubmit">
                            <button className="btn btn-primary btn-block" onClick={ClickedOrder}>Cumpără
                                pentru {necessaryPoints.value} puncte
                            </button>
                        </div>
                        {isClickedOrder.value &&

                        <div className="ConfirmOrderDiv">
                            <div>
                                <p>Confirmă achiziționarea</p>
                            </div>
                            <div className="buttonsForConfirmOrder">
                                <div className="buttonSubmit">
                                    <button className="btn btn-primary btn-block" onClick={ConfirmOrderYes}>Da
                                    </button>
                                </div>
                                <div className="buttonSubmit">
                                    <button className="btn btn-primary btn-block" onClick={ConfirmOrderNo}>Nu
                                    </button>
                                </div>
                            </div>

                        </div>}
                    </div>
                    }
                    {clicked.value && !(points.points > necessaryPoints.value) &&
                    <div>
                        <p> Nu ai suficiente puncte pentru acest tip de joc. Joacă un tip de nivel pe care ți-l permiti,
                            antrenează-te sau adaugă intrebări pentru a obține punctele necesare.</p>
                        <div className="buttonSubmit">
                            <button className="btn btn-primary btn-block" onClick={GoToTrainingPage}>Haide la
                                antrenament
                            </button>

                        </div>
                        <div className="buttonSubmit">
                            <button className="btn btn-primary btn-block" onClick={GoToAddQuestionPage}>Adaugă intrebari
                                de
                                antrenament
                            </button>
                        </div>
                    </div>
                    }
                    {
                        typeOfLevel.value === "EASY" && isClickedOrderYes.value && !isSubmittedForm.value &&
                        <div id="forMargin">

                            <form onSubmit={handleSubmit}>
                                <div id="paragraphGame">
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                {/*<FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>*/}
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[0]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_1} value="question0_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[0]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_2} value="question0_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[0]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_3} value="question0_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[0]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_4} value="question0_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[0]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[1]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_1} value="question1_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[1]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_2} value="question1_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[1]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_3} value="question1_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[1]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_4} value="question1_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[1]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[2]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_1} value="question2_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[2]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_2} value="question2_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[2]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_3} value="question2_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[2]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_4} value="question2_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[2]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[3]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_1} value="question3_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[3]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_2} value="question3_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[3]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_3} value="question3_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[3]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_4} value="question3_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[3]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[4]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_1} value="question4_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[4]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_2} value="question4_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[4]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_3} value="question4_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[4]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_4} value="question4_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[4]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[5]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_1} value="question5_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[5]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_2} value="question5_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[5]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_3} value="question5_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[5]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_4} value="question5_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[5]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[6]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_1} value="question6_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[6]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_2} value="question6_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[6]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_3} value="question6_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[6]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_4} value="question6_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[6]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[7]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_1} value="question7_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[7]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_2} value="question7_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[7]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_3} value="question7_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[7]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_4} value="question7_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[7]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[8]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_1} value="question8_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[8]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_2} value="question8_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[8]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_3} value="question8_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[8]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_4} value="question8_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[8]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{easyQuestions[9]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_1} value="question9_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[9]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_2} value="question9_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[9]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_3} value="question9_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[9]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_4} value="question9_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={easyQuestions[9]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="buttonCheck">
                                        <button className="btn btn-primary btn-block">Verifică testul!</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    }
                    {isClickedOrderYes.value === true && (typeOfLevel.value === "MEDIUM" || typeOfLevel.value === "HARD") &&
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
                    {
                        typeOfLevel.value === "MEDIUM" && isClickedOrderYes.value && !isSubmittedForm.value &&
                        <div>

                            <form onSubmit={handleSubmit}>
                                <div id="paragraphGame">
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[0]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_1} value="question0_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_2} value="question0_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_3} value="question0_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked0.var_4} value="question0_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[1]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_1} value="question1_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_2} value="question1_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_3} value="question1_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked1.var_4} value="question1_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[2]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_1} value="question2_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_2} value="question2_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_3} value="question2_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked2.var_4} value="question2_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[3]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_1} value="question3_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_2} value="question3_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_3} value="question3_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked3.var_4} value="question3_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[4]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_1} value="question4_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_2} value="question4_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_3} value="question4_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked4.var_4} value="question4_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[5]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_1} value="question5_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_2} value="question5_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_3} value="question5_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked5.var_4} value="question5_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[6]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_1} value="question6_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_2} value="question6_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_3} value="question6_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked6.var_4} value="question6_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[7]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_1} value="question7_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_2} value="question7_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_3} value="question7_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked7.var_4} value="question7_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[8]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_1} value="question8_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_2} value="question8_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_3} value="question8_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked8.var_4} value="question8_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="classForPaper">
                                        <Paper className="paper">
                                            <FormControl>
                                                <FormLabel
                                                    id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[9]["question"]}</p>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_1} value="question9_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_1"]}
                                                    />
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_2} value="question9_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_2"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_3} value="question9_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_3"]}/>
                                                    <FormControlLabel className="responseVariant"
                                                                      checked={checked9.var_4} value="question9_var_4"
                                                                      control={<Radio/>}
                                                                      style={{
                                                                          fontFamily: "source - code - pro, Menlo, Monaco, Consolas,  'Courier New', monospace !important"
                                                                      }}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="buttonCheck">
                                        <button className="btn btn-primary btn-block">Verifică testul!</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    }
                    {
                        typeOfLevel.value === "HARD" && isClickedOrderYes.value && !isSubmittedForm.value &&
                        <div>

                            <form onSubmit={handleSubmit}>
                                <div id="paragraphGame">
                                    <div>
                                        <div className="classForPaper">
                                            <Paper className="paper">
                                                <p id="textForQuestion">{hardQuestions[0]["question"]}</p>
                                                <div className="classForTextArea">
                                                    <TextareaAutosize
                                                        id="idResponseQuestion1"
                                                        aria-label="empty textarea"
                                                        placeholder="Write your response here"
                                                        minRows={3}
                                                        style={{width: 600, marginBottom: 10}}
                                                        onChange={e => setHardQuestionResponse1({answer: e.target.value})}

                                                    />
                                                </div>
                                            </Paper>
                                        </div>
                                        <div className="classForPaper">
                                            <Paper className="paper">
                                                <p id="textForQuestion">{hardQuestions[1]["question"]}</p>
                                                <div className="classForTextArea">
                                                    <TextareaAutosize
                                                        id="idResponseQuestion2"
                                                        aria-label="empty textarea"
                                                        placeholder="Write your response here"
                                                        minRows={3}
                                                        style={{width: 600, marginBottom: 10}}
                                                        onChange={e => setHardQuestionResponse2({answer: e.target.value})}
                                                    />
                                                </div>
                                            </Paper>
                                        </div>
                                        <div className="classForPaper">
                                            <Paper className="paper">
                                                <p id="textForQuestion">{hardQuestions[2]["question"]}</p>
                                                <div className="classForTextArea">
                                                    <TextareaAutosize
                                                        id="idResponseQuestion3"
                                                        aria-label="empty textarea"
                                                        placeholder="Write your response here"
                                                        minRows={3}
                                                        style={{width: 600, marginBottom: 10}}
                                                        onChange={e => setHardQuestionResponse3({answer: e.target.value})}
                                                    />
                                                </div>
                                            </Paper>
                                        </div>
                                    </div>
                                    <div className="buttonCheck">
                                        <button className="btn btn-primary btn-block">Verifică testul!</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    {
                        isSubmittedForm.value && typeOfLevel.value !== "HARD" &&
                        <div className="componentGameQuestion">
                            <p id="pForFirstDiv">
                                Ai raspuns corect la {submittedDetails.numberOfCorrectResponses} intrebari!
                            </p>
                            <p id="pForFirstDiv">
                                Ai raspuns gresit la {submittedDetails.numberOfWrongResponses} intrebari!
                            </p>
                            <p id="pForFirstDiv">
                                Ai lasat {submittedDetails.numberOfEmptyResponses} intrebari fara raspuns!
                            </p>
                            <p id="pForFirstDiv">
                                Ai obtinut {submittedDetails.numberOfPointsWin} puncte la acest test!
                            </p>
                        </div>
                    }
                    {
                        isSubmittedForm.value && typeOfLevel.value === "HARD" &&
                        <div className="componentGameQuestion">
                            <p id="pForFirstDiv">
                                Ai raspuns corect la {hardNumberOfCorrectResponses} intrebari!
                            </p>
                            <p id="pForFirstDiv">
                                Ai raspuns gresit la {hardNumberOfWrongResponses} intrebari!
                            </p>
                            <p id="pForFirstDiv">
                                Ai lasat {3 - hardNumberOfCorrectResponses - hardNumberOfWrongResponses} intrebari fara
                                raspuns!
                            </p>
                            <p id="pForFirstDiv">
                                Ai obtinut {hardNumberOfCorrectResponses * (numberOfPointsCanYouWin.value / 3)} puncte
                                la acest test!
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
