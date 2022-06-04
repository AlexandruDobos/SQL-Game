import React, {useState} from 'react';
import IPv4 from '../index'
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
import '../css/addquestion.css'
import diagram from "../images/studentiDiagram.svg"

export default function AddQuestion() {

    const [state, setState] = useState({user: ""});
    const [username, setUsername] = useState({username: ""});
    const [token, setToken] = useState({token: localStorage.getItem("token")})
    const [easy, setEasy] = React.useState({value: "false"});
    const [medium, setMedium] = React.useState({value: "false"});
    const [hard, setHard] = React.useState({value: "false"});
    const [addQuestion, setAddQuestion] = useState({question: ""});
    const [checked, setChecked] = useState({var_1: false, var_2: false, var_3: false, var_4: false});
    const [responsesData, setResponsesData] = useState({var_1: "", var_2: "", var_3: "", var_4: "", correct: ""})
    const [selectedAnswer, setSelectedAnswer] = useState({answer: ""});
    const [hardResponse, setHardResponse] = useState({answer: ""})
    const [messageAddQuestion, setMessageAddQuestion] = useState({message: ""});
    const [isSuccessSubmit, setIsSuccessSubmit] = useState({value: "false"});
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
                    setState({
                        user: dates["JWT"]["data"]["email"]
                    })
                    setUsername({
                        username: dates["JWT"]["data"]["username"]
                    })
                })
        }
    }

    React.useEffect(() => {
        decodeJWT();

        window.addEventListener('storage', () => {
            // When local storage changes, dump the list to
            // the console.
            //setToken({token: localStorage.getItem("token")})
            decodeJWT();
        });

    }, [token.token])

    const handleEasyChange = e => {
        setIsSuccessSubmit({value: "false"})
        if (easy.value === "false") {
            setEasy({value: "true"})
            setMedium({value: "false"})
            setHard({value: "false"})
        } else if (easy.value === "true") {
            setEasy({value: "false"})
            setMedium({value: "false"})
            setHard({value: "false"})
        }
        setIsDisplayImage({value: "false"})
    }

    const handleMediumChange = e => {
        setIsSuccessSubmit({value: "false"})
        if (medium.value === "false") {
            setEasy({value: "false"})
            setMedium({value: "true"})
            setHard({value: "false"})
        } else if (medium.value === "true") {
            setEasy({value: "false"})
            setMedium({value: "false"})
            setHard({value: "false"})
        }
        setIsDisplayImage({value: "false"})
    }

    const handleHardChange = e => {
        setIsSuccessSubmit({value: "false"})
        if (hard.value === "false") {
            setEasy({value: "false"})
            setMedium({value: "false"})
            setHard({value: "true"})
        } else if (hard.value === "true") {
            setEasy({value: "false"})
            setMedium({value: "false"})
            setHard({value: "false"})
        }
        setIsDisplayImage({value: "false"})
    }

    const handleChange = e => {
        e.preventDefault();
        const {value} = e.target;
        setChecked(() => {
            return {
                var_1: false,
                var_2: false,
                var_3: false,
                var_4: false,
                [e.target.value]: true
            };
        });
        setSelectedAnswer({answer: value})
    };

    function AddTrainingQuestion() {
        
        if(easy.value === "true" || medium.value === "true") {
            const data = {
                email: state.user,
                username: username.username,
                question: addQuestion.question,
                difficulty: easy.value === "true" ? "Easy" : "Medium",
                var_1: responsesData.var_1,
                var_2: responsesData.var_2,
                var_3: responsesData.var_3,
                var_4: responsesData.var_4,
                var_correct: selectedAnswer.answer
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            };
            let input = IPv4 + "/Licenta/models/AddTrainingQuestion.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    console.log(dates)
                    setMessageAddQuestion({message: dates.message})
                    Array.from(document.querySelectorAll("textarea")).forEach(
                        input => (input.value = "")
                    );
                    setChecked(() => {
                        return {
                            var_1: false,
                            var_2: false,
                            var_3: false,
                            var_4: false
                        }
                    })
                    setSelectedAnswer({answer: ""})
                    setEasy({value: "false"})
                    setMedium({value: "false"})
                    setIsSuccessSubmit({value: "true"})
                })
                .catch((error) => {
                    console.log(error);
                    Array.from(document.querySelectorAll("textarea")).forEach(
                        input => (input.value = "")
                    );
                    setChecked(() => {
                        return {
                            var_1: false,
                            var_2: false,
                            var_3: false,
                            var_4: false
                        }
                    })
                    setSelectedAnswer({answer: ""})
                    setEasy({value: "false"})
                    setMedium({value: "false"})
                });
        }else if(hard.value === "true"){
            const data = {
                email: state.user,
                username: username.username,
                question: addQuestion.question,
                difficulty: "Hard",
                var_correct: hardResponse.answer
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify(data)
            };
            let input = IPv4 + "/Licenta/models/AddHardTrainingQuestion.php"
            fetch(
                input,
                requestOptions
            )
                .then((response) => response.json())
                .then((dates) => {
                    console.log(dates)
                    setMessageAddQuestion({message: dates.message})
                    Array.from(document.querySelectorAll("textarea")).forEach(
                        input => (input.value = "")
                    );
                    setHardResponse({answer: ""})
                    setAddQuestion({question: ""})
                    setHard({value: "false"})
                    setIsSuccessSubmit({value: "true"})
                })
                .catch((error) => {
                    console.log(error);
                    Array.from(document.querySelectorAll("textarea")).forEach(
                        input => (input.value = "")
                    );
                });
        }
    }

    const handleAddQuestionSubmit = e => {
        e.preventDefault();
        /*console.log(addQuestion.question)
        console.log(responsesData.var_1)
        console.log(responsesData.var_2)
        console.log(responsesData.var_3)
        console.log(responsesData.var_4)
        console.log(checked.var_1)
        console.log(checked.var_2)
        console.log(checked.var_3)
        console.log(checked.var_4)
        console.log(hard.value);*/
        if (easy.value === "true" || medium.value === "true") {
            if (!(addQuestion.question && responsesData.var_1 && responsesData.var_2 && responsesData.var_3 && responsesData.var_4)) {
                console.log("exista variante goale")
                setMessageAddQuestion({message: "Date insuficiente"})
            } else {
                if (!selectedAnswer.answer) {
                    console.log("nu a fost aleasa o varianta corecta")
                    setMessageAddQuestion({message: "Alege varianta corectă"})
                } else {
                    AddTrainingQuestion();
                    setIsDisplayImage({value: "false"})
                }
            }
        } else if (hard.value === "true") {
            if (addQuestion.question === "" || hardResponse.answer === "") {
                setMessageAddQuestion({message: "Date insuficiente"})
            } else {
                AddTrainingQuestion();
                setIsDisplayImage({value: "false"})
            }
        }

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
        <div className="mainContent">
            <div>
                <h2>Adaugă întrebare de antrenament</h2>
            </div>
            <div className="textForQuestion">
                <p>Adaugă aici o intrebare de antrenament și poți câștiga puncte. În funcție de tipul întrebarii
                    adăugate poți primi un număr mai mare de puncte. Pentru a primi punctele trebuie ca unul dintre
                    administratori să îți accepte întrebarea. Este nevoie de confirmarea acestora pentru a asigura buna
                    desfășurare a jocului.</p>
            </div>
            <div>
                <h3>De ce tip vrei să fie întrebarea?</h3>
            </div>
            <div className="topContentMenu">
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
            {easy.value === "true" &&
            <div className="centerContent">
                <div className="itemCenterContent">
                    <p>Trebuie să adaugi o întrebare teoretică ce va conține patru variante de răspuns (o variantă de răspuns corectă și trei variante de răspuns greșite). Trebuie să bifezi varianta de răspuns corectă. Toate câmpurile trebuiesc completate. Dacă sunt respectate cerințele, întrebarea ta va fi trimisă administratorilor, altfel vei primi un mesaj de eroare. Dacă întrebarea ta este acceptată, vei primi punctajul corespunzător!</p>
                </div>
            </div>
            }
            {medium.value === "true" &&
            <div className="centerContent">
                <div className="itemCenterContent">
                    <p>Trebuie să adaugi o întrebare ce va avea ca variante de răspuns patru interogări, așa cum ai putut sesiza pe pagina de antrenament. Dintre cele patru variante de răspuns, una va conține interogarea corectă și celelalte trei vor conține interogări greșite, care să aibă legătura cu întrebarea. Trebuie să bifezi varianta de răspuns corectă. Toate câmpurile trebuiesc completate. Dacă sunt respectate cerințele, întrebarea ta va fi trimisă administratorilor, altfel vei primi un mesaj de eroare. Dacă întrebarea ta este acceptată, vei primi punctajul corespunzător!</p>
                </div>
            </div>
            }
            {hard.value === "true" &&
            <div className="centerContent">
                <div className="itemCenterContent">
                    <p>Trebuie să formulezi o întrebare de tip interogare care să poată fi rulată pe tabela studenti. Răspunsul corect al interogării îl vei scrie în câmpul special destinat. Dacă ai completat câmpurile, întrebarea ta va fi trimisă administratorilor spre verificare. Dacă întrebarea ta este acceptată, vei primi punctajul corespunzător!</p>
                </div>
            </div>
            }
            {(easy.value === "true" || medium.value === "true" || hard.value === "true") &&
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
            
            {(easy.value === "true" || medium.value === "true") &&
            <div className="centerContent">
                <div className="itemCenterContent">
                    <form onSubmit={handleAddQuestionSubmit}>
                        <p id="questionTitle">Întrebarea ta</p>
                        <div id="childChangeDetails">
                            <div>
                                <TextareaAutosize
                                    id="questionID"
                                    aria-label="empty textarea"
                                    placeholder="Write the question"
                                    style={{width: 630}}
                                    minRows={2}
                                    onChange={e => addQuestion.question = e.target.value}
                                />
                                <p id="questionTitle">Varianta 1</p>
                                <FormControlLabel checked={checked.var_1} value="var_1" control={<Radio/>}
                                                  onChange={handleChange}
                                                  label={<TextareaAutosize
                                                      id="idVar1"
                                                      aria-label="empty textarea"
                                                      placeholder="Write the answer"
                                                      style={{width: 600}}
                                                      onChange={e => responsesData.var_1 = e.target.value}
                                                  />}/>

                                <p id="questionTitle">Varianta 2</p>
                                <FormControlLabel checked={checked.var_2} value="var_2" control={<Radio/>}
                                                  onChange={handleChange}
                                                  label={<TextareaAutosize
                                                      id="idVar2"
                                                      aria-label="empty textarea"
                                                      placeholder="Write the answer"
                                                      style={{width: 600}}
                                                      onChange={e => responsesData.var_2 = e.target.value}
                                                  />}/>
                                <p id="questionTitle">Varianta 3</p>
                                <FormControlLabel checked={checked.var_3} value="var_3" control={<Radio/>}
                                                  onChange={handleChange}
                                                  label={<TextareaAutosize
                                                      id="idVar3"
                                                      aria-label="empty textarea"
                                                      placeholder="Write the answer"
                                                      style={{width: 600}}
                                                      onChange={e => responsesData.var_3 = e.target.value}
                                                  />}/>
                                <p id="questionTitle">Varianta 4</p>
                                <FormControlLabel checked={checked.var_4} value="var_4" control={<Radio/>}
                                                  onChange={handleChange}
                                                  label={<TextareaAutosize
                                                      id="idVar4"
                                                      aria-label="empty textarea"
                                                      placeholder="Write the answer"
                                                      style={{width: 600}}
                                                      onChange={e => responsesData.var_4 = e.target.value}
                                                  />}/>
                                <p id="questionTitle">Bifează varianta corectă!</p>
                            </div>
                            <div className="buttonLogin" id="childChangeDetails">
                                <button className="btn btn-primary btn-block">Submit</button>
                            </div>
                            <div className="errorSubmit">
                                {messageAddQuestion.message}
                            </div>
                        </div>
                    </form>
                </div>
            </div>}
            {hard.value === "true" &&
            <div className="centerContent">
                <div className="itemCenterContent">
                    <p id="questionTitle">Întrebarea ta</p>
                    <form onSubmit={handleAddQuestionSubmit}>
                        <TextareaAutosize
                            id="questionID"
                            aria-label="empty textarea"
                            placeholder="Write the question"
                            style={{width: 600}}
                            minRows={2}
                            value={addQuestion.question}
                            onChange={e => setAddQuestion({question: e.target.value})}
                        />
                        <p id="questionTitle">Răspunsul la întrebare</p>
                        <TextareaAutosize
                            id="responseID"
                            aria-label="empty textarea"
                            placeholder="Write the answer"
                            style={{width: 600}}
                            minRows={1}
                            value={hardResponse.answer}
                            onChange={e => setHardResponse({answer: e.target.value})}
                        />
                        <div className="buttonLogin" id="childChangeDetails">
                            <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                        <div className="errorSubmit">
                            {messageAddQuestion.message}
                        </div>
                    </form>
                </div>
            </div>}
            {isSuccessSubmit.value === "true" && 
            <div>
                <p>Întrebare adăugată cu succes!</p>
            </div>}
        </div>
    )
}