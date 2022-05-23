import React, {useState} from 'react';
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
import diagram from "../images/studentiDiagram.svg";

export default function Game() {

    const [state, setState] = useState({user: ""});
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
    const [errorData, setErrorData] = useState({message: ""});
    const [submitMessage, setSubmitMessage] = useState({message: ""});
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
    const [hardQuestionResponsesValue, setHardQuestionResponsesValue] = useState({
        response1: "",
        response2: "",
        response3: ""
    })
    const [clicked, setClicked] = useState({value: false})
    const [typeOfLevel, setTypeOfLevel] = useState({value: ""})
    const [necessaryPoints, setNecessaryPoints] = useState({value: ""})
    const [numberOfPointsCanYouWin, setNumberOfPointsCanYouWin] = useState({value: ""})
    const [isClickedOrder, setIsClickedOrder] = useState({value: false})
    const [isClickedOrderYes, setIsClickedOrderYes] = useState({value: false})
    const [isSubmittedForm, setIsSubmittedForm] = useState({value: false})
    const [submittedDetails, setSubmittedDetails] = useState({
        numberOfCorrectResponses: "",
        numberOfWrongResponses: "",
        numberOfEmptyResponses: "",
        numberOfPointsWin: "",
        timeRemaining: ""
    })
    const [easyQuestions, setEasyQuestions] = useState({});
    const [mediumQuestions, setMediumQuestions] = useState({});
    const [hardQuestions, setHardQuestions] = useState({});

    const [isDisplayImage, setIsDisplayImage] = useState({value: "false"})
    const [textForImageButton, setTextForImageButton] = useState({value: "Afișează diagrama tabelei!"})
    const [isImageCreate, setIsImageCreate] = useState({value: "false"});

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
                    setPoints({
                        points: dates["JWT"]["data"]["points"]
                    })
                })
        }
    }


    React.useEffect(() => {
        decodeJWT();
    }, []);

    function changePoints(parameter) {
        if (parameter === "add") {
            console.log("puncte: " + submittedDetails.numberOfPointsWin)
            if(submittedDetails.numberOfPointsWin > 0) {
                const data = {
                    email: state.user,
                    numberOfPoints: submittedDetails.numberOfPointsWin
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
        setNecessaryPoints({value: 100})
        setNumberOfPointsCanYouWin({value: 300})
        changeValuesToDefault();
        
    }

    function MediumButtonAction() {
        setClicked({value: true})
        setIsClickedOrder({value: false})
        setIsClickedOrderYes({value: false})
        setTypeOfLevel({value: "MEDIUM"})
        setIsSubmittedForm({value: false})
        setNecessaryPoints({value: 200})
        setNumberOfPointsCanYouWin({value: 600})
        changeValuesToDefault();
    }

    function HardButtonAction() {
        setClicked({value: true})
        setIsClickedOrder({value: false})
        setIsClickedOrderYes({value: false})
        setTypeOfLevel({value: "HARD"})
        setIsSubmittedForm({value: false})
        setNecessaryPoints({value: 500})
        setNumberOfPointsCanYouWin({value: 1500})
        changeValuesToDefault();
    }

    function GoToTrainingPage() {
        window.location.href = '/training'
    }

    function GoToAddQuestionPage() {
        window.location.href = '/addquestion.js'
    }

    function ClickedOrder() {
        setIsClickedOrder({value: true})
        if(typeOfLevel.value === "EASY") {
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
        } else if(typeOfLevel.value === "MEDIUM"){
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
        }
        else if(typeOfLevel.value === "HARD"){
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
        changePoints("decrement");
        setClicked({value: false})
        setIsClickedOrderYes({value: true})
        setTextForImageButton({value: "Afișează diagrama tabelei!"})
        setIsDisplayImage({value: "false"})
        if(isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
    }

    function ConfirmOrderNo() {
        setClicked({value: false})
    }
    
    function changeValuesToDefault(){
        setTextForImageButton({value: "Afișează diagrama tabelei!"})
        setIsDisplayImage({value: "false"})
        if(isImageCreate.value === "true") {
            let element = document.getElementById("divForImage");
            element.remove();
            setIsImageCreate({value: "false"})
        }
        setChecked0({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer0({answer: ""})
        setChecked1({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer1({answer: ""})
        setChecked2({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer2({answer: ""})
        setChecked3({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer3({answer: ""})
        setChecked4({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer4({answer: ""})
        setChecked5({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer5({answer: ""})
        setChecked6({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer6({answer: ""})
        setChecked7({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer7({answer: ""})
        setChecked8({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer8({answer: ""})
        setChecked9({var_1: false, var_2: false, var_3: false, var_4: false}); setSelectedAnswer9({answer: ""})
        setHardQuestionResponse1({answer: ""})
        setHardQuestionResponse2({answer: ""})
        setHardQuestionResponse3({answer: ""})
        setHardQuestionResponsesValue({
            response1: "",
            response2: "",
            response3: ""
        })
    }
    
    function checkHardQuestion(index, userResponse){
        console.log(userResponse);
        const data = {
            correct_answer: hardQuestions[index]["response"],
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
                if(dates.message === "Raspuns corect!") {
                    if (index === 0) {
                        setHardQuestionResponsesValue({response1: true})
                    } else if (index === 1) {
                        setHardQuestionResponsesValue({response2: true})
                    } else if (index === 2) {
                        setHardQuestionResponsesValue({response3: true})
                    }
                }
            })
    }

    const handleChange = e => {
        e.preventDefault();
        console.log(e.target.value);
        //const number = parseInt(e.target.value.slice(-1));
        const number = parseInt(e.target.value.substring(0,9).slice(-1))
        let value = e.target.value.slice(-5);
        console.log(value);
        console.log(number);
        switch(number){
            case 0: { setChecked0(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer0({answer: value}) } break;
            case 1: { setChecked1(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer1({answer: value}) } break;
            case 2: { setChecked2(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer2({answer: value}) } break;
            case 3: { setChecked3(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer3({answer: value}) } break;
            case 4: { setChecked4(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer4({answer: value}) } break;
            case 5: { setChecked5(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer5({answer: value}) } break;
            case 6: { setChecked6(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer6({answer: value}) } break;
            case 7: { setChecked7(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer7({answer: value}) } break;
            case 8: { setChecked8(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer8({answer: value}) } break;
            case 9: { setChecked9(() => { return { var_1: false, var_2: false, var_3: false, var_4: false, [e.target.value.slice(-5)]: true}});setSelectedAnswer9({answer: value}) } break;
        }
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        setIsSubmittedForm({value: true})
        
        if(typeOfLevel.value === "EASY"){
            //trebuie să verific câte răspunsuri a avut corecte
            let index = 0;
            let emptyResponses = 0;
            if(selectedAnswer0.answer === easyQuestions[0]["correct_answer"]) index++; else if(!selectedAnswer0.answer) emptyResponses++;
            if(selectedAnswer1.answer === easyQuestions[1]["correct_answer"]) index++; else if(!selectedAnswer1.answer) emptyResponses++;
            if(selectedAnswer2.answer === easyQuestions[2]["correct_answer"]) index++; else if(!selectedAnswer2.answer) emptyResponses++;
            if(selectedAnswer3.answer === easyQuestions[3]["correct_answer"]) index++; else if(!selectedAnswer3.answer) emptyResponses++;
            if(selectedAnswer4.answer === easyQuestions[4]["correct_answer"]) index++; else if(!selectedAnswer4.answer) emptyResponses++;
            if(selectedAnswer5.answer === easyQuestions[5]["correct_answer"]) index++; else if(!selectedAnswer5.answer) emptyResponses++;
            if(selectedAnswer6.answer === easyQuestions[6]["correct_answer"]) index++; else if(!selectedAnswer6.answer) emptyResponses++;
            if(selectedAnswer7.answer === easyQuestions[7]["correct_answer"]) index++; else if(!selectedAnswer7.answer) emptyResponses++;
            if(selectedAnswer8.answer === easyQuestions[8]["correct_answer"]) index++; else if(!selectedAnswer8.answer) emptyResponses++;
            if(selectedAnswer9.answer === easyQuestions[9]["correct_answer"]) index++; else if(!selectedAnswer9.answer) emptyResponses++;
            setSubmittedDetails({
                numberOfCorrectResponses: index,
                numberOfWrongResponses: 10 - index - emptyResponses,
                numberOfEmptyResponses: emptyResponses,
                numberOfPointsWin: (index*numberOfPointsCanYouWin.value/10)
            })
        } else if(typeOfLevel.value === "MEDIUM"){
            //trebuie să verific câte răspunsuri a avut corecte
            let index = 0;
            let emptyResponses = 0;
            if(selectedAnswer0.answer === mediumQuestions[0]["correct_answer"]) index++; else if(!selectedAnswer0.answer) emptyResponses++;
            if(selectedAnswer1.answer === mediumQuestions[1]["correct_answer"]) index++; else if(!selectedAnswer1.answer) emptyResponses++;
            if(selectedAnswer2.answer === mediumQuestions[2]["correct_answer"]) index++; else if(!selectedAnswer2.answer) emptyResponses++;
            if(selectedAnswer3.answer === mediumQuestions[3]["correct_answer"]) index++; else if(!selectedAnswer3.answer) emptyResponses++;
            if(selectedAnswer4.answer === mediumQuestions[4]["correct_answer"]) index++; else if(!selectedAnswer4.answer) emptyResponses++;
            if(selectedAnswer5.answer === mediumQuestions[5]["correct_answer"]) index++; else if(!selectedAnswer5.answer) emptyResponses++;
            if(selectedAnswer6.answer === mediumQuestions[6]["correct_answer"]) index++; else if(!selectedAnswer6.answer) emptyResponses++;
            if(selectedAnswer7.answer === mediumQuestions[7]["correct_answer"]) index++; else if(!selectedAnswer7.answer) emptyResponses++;
            if(selectedAnswer8.answer === mediumQuestions[8]["correct_answer"]) index++; else if(!selectedAnswer8.answer) emptyResponses++;
            if(selectedAnswer9.answer === mediumQuestions[9]["correct_answer"]) index++; else if(!selectedAnswer9.answer) emptyResponses++;
            setSubmittedDetails({
                numberOfCorrectResponses: index,
                numberOfWrongResponses: 10 - index - emptyResponses,
                numberOfEmptyResponses: emptyResponses,
                numberOfPointsWin: (index*numberOfPointsCanYouWin.value/10)
            })
        } else if(typeOfLevel.value === "HARD"){
            console.log("response1 " + hardQuestionResponse1.answer)
            console.log("response2 " + hardQuestionResponse2.answer)
            console.log("response3 " + hardQuestionResponse3.answer)
            let index = 0;
            let emptyResponses = 0;
            if(!hardQuestionResponse1.answer) emptyResponses++; else {checkHardQuestion(0, hardQuestionResponse1.answer); if(hardQuestionResponsesValue.response1) index++;}
            if(!hardQuestionResponse2.answer) emptyResponses++; else {checkHardQuestion(1, hardQuestionResponse2.answer); if(hardQuestionResponsesValue.response2) index++;}
            if(!hardQuestionResponse3.answer) emptyResponses++; else {checkHardQuestion(2, hardQuestionResponse3.answer); if(hardQuestionResponsesValue.response3) index++;}
            
            /*if(hardQuestionResponsesValue.response1) index++;
            if(hardQuestionResponsesValue.response2) index++;
            if(hardQuestionResponsesValue.response3) index++;*/
            
            setSubmittedDetails({
                numberOfCorrectResponses: index,
                numberOfWrongResponses: 3 - index - emptyResponses,
                numberOfEmptyResponses: emptyResponses,
                numberOfPointsWin: (index*numberOfPointsCanYouWin.value/10)
            })
        }
        changePoints("add");
    }

    const handleShowImage = e => {
        e.preventDefault();
        if(isDisplayImage.value === "false"){
            setIsDisplayImage({value: "true"})
            setTextForImageButton({value: "Ascunde diagrama tabelei!"})
            if(isImageCreate.value === "false") {
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
        }else{
            setIsDisplayImage({value: "false"})
            if(isImageCreate.value === "true") {
                let element = document.getElementById("divForImage");
                element.remove();
                setIsImageCreate({value: "false"})
            }
            setTextForImageButton({value: "Afișează diagrama tabelei!"})
        }
    }

    return (
        <div>
            <div className="title">
                <h2>{state.user} Game Page</h2>
            </div>
            <div className="component">
                <div className="componentMenu boxComponentMenu">
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

                <div className="ComponentGame">
                    {!clicked.value && !isClickedOrderYes.value &&
                    <div>Selectează tipul de joc și hai să începem!</div>}
                    {clicked.value && points.points > necessaryPoints.value &&
                    <div>
                        <p> Ești gata să începi un joc de tip {typeOfLevel.value}. Acest tip de joc te va
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
                            <button className="btn btn-primary btn-block" onClick={GoToAddQuestionPage}>Adaugă intrebari de
                                antrenament
                            </button>
                        </div>
                    </div>
                    }
                    {
                        typeOfLevel.value === "EASY" && isClickedOrderYes.value && !isSubmittedForm.value &&
                        <div>
                            
                                <form onSubmit={handleSubmit}>
                                    <div id="paragraphGame">
                                        <div >
                                            <Paper>
                                                <FormControl>
                                                    {/*<FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>*/}
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[0]["question"]}</p>
                                                        <FormControlLabel checked={checked0.var_1} value="question0_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[0]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked0.var_2} value="question0_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[0]["var_2"]}/>
                                                        <FormControlLabel checked={checked0.var_3} value="question0_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[0]["var_3"]}/>
                                                        <FormControlLabel checked={checked0.var_4} value="question0_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[0]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper >
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[1]["question"]}</p>
                                                        <FormControlLabel checked={checked1.var_1} value="question1_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[1]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked1.var_2} value="question1_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[1]["var_2"]}/>
                                                        <FormControlLabel checked={checked1.var_3} value="question1_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[1]["var_3"]}/>
                                                        <FormControlLabel checked={checked1.var_4} value="question1_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[1]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[2]["question"]}</p>
                                                        <FormControlLabel checked={checked2.var_1} value="question2_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[2]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked2.var_2} value="question2_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[2]["var_2"]}/>
                                                        <FormControlLabel checked={checked2.var_3} value="question2_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[2]["var_3"]}/>
                                                        <FormControlLabel checked={checked2.var_4} value="question2_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[2]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[3]["question"]}</p>
                                                        <FormControlLabel checked={checked3.var_1} value="question3_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[3]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked3.var_2} value="question3_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[3]["var_2"]}/>
                                                        <FormControlLabel checked={checked3.var_3} value="question3_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[3]["var_3"]}/>
                                                        <FormControlLabel checked={checked3.var_4} value="question3_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[3]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[4]["question"]}</p>
                                                        <FormControlLabel checked={checked4.var_1} value="question4_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[4]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked4.var_2} value="question4_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[4]["var_2"]}/>
                                                        <FormControlLabel checked={checked4.var_3} value="question4_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[4]["var_3"]}/>
                                                        <FormControlLabel checked={checked4.var_4} value="question4_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[4]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[5]["question"]}</p>
                                                        <FormControlLabel checked={checked5.var_1} value="question5_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[5]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked5.var_2} value="question5_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[5]["var_2"]}/>
                                                        <FormControlLabel checked={checked5.var_3} value="question5_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[5]["var_3"]}/>
                                                        <FormControlLabel checked={checked5.var_4} value="question5_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[5]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[6]["question"]}</p>
                                                        <FormControlLabel checked={checked6.var_1} value="question6_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[6]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked6.var_2} value="question6_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[6]["var_2"]}/>
                                                        <FormControlLabel checked={checked6.var_3} value="question6_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[6]["var_3"]}/>
                                                        <FormControlLabel checked={checked6.var_4} value="question6_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[6]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[7]["question"]}</p>
                                                        <FormControlLabel checked={checked7.var_1} value="question7_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[7]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked7.var_2} value="question7_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[7]["var_2"]}/>
                                                        <FormControlLabel checked={checked7.var_3} value="question7_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[7]["var_3"]}/>
                                                        <FormControlLabel checked={checked7.var_4} value="question7_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[7]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[8]["question"]}</p>
                                                        <FormControlLabel checked={checked8.var_1} value="question8_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[8]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked8.var_2} value="question8_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[8]["var_2"]}/>
                                                        <FormControlLabel checked={checked8.var_3} value="question8_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[8]["var_3"]}/>
                                                        <FormControlLabel checked={checked8.var_4} value="question8_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[8]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div>
                                            <Paper>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue="female"
                                                        name="radio-buttons-group"
                                                    >
                                                        <p className="componentGameQuestion">{easyQuestions[9]["question"]}</p>
                                                        <FormControlLabel checked={checked9.var_1} value="question9_var_1"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[9]["var_1"]}
                                                        />
                                                        <FormControlLabel checked={checked9.var_2} value="question9_var_2"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[9]["var_2"]}/>
                                                        <FormControlLabel checked={checked9.var_3} value="question9_var_3"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[9]["var_3"]}/>
                                                        <FormControlLabel checked={checked9.var_4} value="question9_var_4"
                                                                          control={<Radio/>}
                                                                          onChange={handleChange}
                                                                          label={easyQuestions[9]["var_4"]}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Paper>
                                        </div>
                                        <div className="buttonCheck">
                                            <button className="btn btn-primary btn-block">Check the easy test!</button>
                                        </div>
                                    </div>
                                </form>
                            
                        </div>
                    }
                    {isClickedOrderYes.value === true && (typeOfLevel.value === "MEDIUM"  || typeOfLevel.value === "HARD") &&
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
                                    <div >
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[0]["question"]}</p>
                                                    <FormControlLabel checked={checked0.var_1} value="question0_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked0.var_2} value="question0_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_2"]}/>
                                                    <FormControlLabel checked={checked0.var_3} value="question0_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_3"]}/>
                                                    <FormControlLabel checked={checked0.var_4} value="question0_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[0]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper >
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[1]["question"]}</p>
                                                    <FormControlLabel checked={checked1.var_1} value="question1_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked1.var_2} value="question1_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_2"]}/>
                                                    <FormControlLabel checked={checked1.var_3} value="question1_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_3"]}/>
                                                    <FormControlLabel checked={checked1.var_4} value="question1_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[1]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[2]["question"]}</p>
                                                    <FormControlLabel checked={checked2.var_1} value="question2_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked2.var_2} value="question2_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_2"]}/>
                                                    <FormControlLabel checked={checked2.var_3} value="question2_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_3"]}/>
                                                    <FormControlLabel checked={checked2.var_4} value="question2_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[2]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[3]["question"]}</p>
                                                    <FormControlLabel checked={checked3.var_1} value="question3_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked3.var_2} value="question3_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_2"]}/>
                                                    <FormControlLabel checked={checked3.var_3} value="question3_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_3"]}/>
                                                    <FormControlLabel checked={checked3.var_4} value="question3_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[3]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[4]["question"]}</p>
                                                    <FormControlLabel checked={checked4.var_1} value="question4_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked4.var_2} value="question4_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_2"]}/>
                                                    <FormControlLabel checked={checked4.var_3} value="question4_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_3"]}/>
                                                    <FormControlLabel checked={checked4.var_4} value="question4_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[4]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[5]["question"]}</p>
                                                    <FormControlLabel checked={checked5.var_1} value="question5_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked5.var_2} value="question5_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_2"]}/>
                                                    <FormControlLabel checked={checked5.var_3} value="question5_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_3"]}/>
                                                    <FormControlLabel checked={checked5.var_4} value="question5_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[5]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[6]["question"]}</p>
                                                    <FormControlLabel checked={checked6.var_1} value="question6_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked6.var_2} value="question6_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_2"]}/>
                                                    <FormControlLabel checked={checked6.var_3} value="question6_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_3"]}/>
                                                    <FormControlLabel checked={checked6.var_4} value="question6_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[6]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[7]["question"]}</p>
                                                    <FormControlLabel checked={checked7.var_1} value="question7_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked7.var_2} value="question7_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_2"]}/>
                                                    <FormControlLabel checked={checked7.var_3} value="question7_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_3"]}/>
                                                    <FormControlLabel checked={checked7.var_4} value="question7_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[7]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[8]["question"]}</p>
                                                    <FormControlLabel checked={checked8.var_1} value="question8_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked8.var_2} value="question8_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_2"]}/>
                                                    <FormControlLabel checked={checked8.var_3} value="question8_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_3"]}/>
                                                    <FormControlLabel checked={checked8.var_4} value="question8_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[8]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div>
                                        <Paper>
                                            <FormControl>
                                                <FormLabel id="demo-radio-buttons-group-label">{questionData.question}</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="female"
                                                    name="radio-buttons-group"
                                                >
                                                    <p className="componentGameQuestion">{mediumQuestions[9]["question"]}</p>
                                                    <FormControlLabel checked={checked9.var_1} value="question9_var_1"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_1"]}
                                                    />
                                                    <FormControlLabel checked={checked9.var_2} value="question9_var_2"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_2"]}/>
                                                    <FormControlLabel checked={checked9.var_3} value="question9_var_3"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_3"]}/>
                                                    <FormControlLabel checked={checked9.var_4} value="question9_var_4"
                                                                      control={<Radio/>}
                                                                      onChange={handleChange}
                                                                      label={mediumQuestions[9]["var_4"]}/>
                                                </RadioGroup>
                                            </FormControl>
                                        </Paper>
                                    </div>
                                    <div className="buttonCheck">
                                        <button className="btn btn-primary btn-block">Check the medium test!</button>
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
                                    <div >
                                        <Paper>
                                            <h2>{hardQuestions[0]["question"]}</h2>
                                            <TextareaAutosize
                                                id="idResponseQuestion1"
                                                aria-label="empty textarea"
                                                placeholder="Write your response here"
                                                minRows={3}
                                                style={{ width: 600 }}
                                                onChange={e => setHardQuestionResponse1({answer: e.target.value})}

                                            />
                                        </Paper>
                                        <Paper>
                                            <h2>{hardQuestions[1]["question"]}</h2>
                                            <TextareaAutosize
                                                id="idResponseQuestion2"
                                                aria-label="empty textarea"
                                                placeholder="Write your response here"
                                                minRows={3}
                                                style={{ width: 600 }}
                                                onChange={e => setHardQuestionResponse2({answer: e.target.value})}
                                            />
                                        </Paper>
                                        <Paper>
                                            <h2>{hardQuestions[2]["question"]}</h2>
                                            <TextareaAutosize
                                                id="idResponseQuestion3"
                                                aria-label="empty textarea"
                                                placeholder="Write your response here"
                                                minRows={3}
                                                style={{ width: 600 }}
                                                onChange={e => setHardQuestionResponse3({answer: e.target.value})}
                                            />
                                        </Paper>
                                    </div>
                                    <div className="buttonCheck">
                                        <button className="btn btn-primary btn-block">Check the hard test!</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                    {
                        isSubmittedForm.value &&
                            <div>
                                <p>
                                    Ai raspuns corect la {submittedDetails.numberOfCorrectResponses} intrebari!
                                    Ai raspuns gresit la {submittedDetails.numberOfWrongResponses} intrebari!
                                    Ai lasat {submittedDetails.numberOfEmptyResponses} intrebari fara raspuns!
                                    Ai obtinut {submittedDetails.numberOfPointsWin} puncte la acest test!
                                </p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
