import React, {useState} from 'react';
import '../css/training.css'
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
//"http://192.168.100.27/Licenta/models/SelectTrainingQuestion.php",
//"http://192.168.1.7/Licenta/models/SelectTrainingQuestion.php",

export default function Training() {

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
    const [selectedAnswer, setSelectedAnswer] = useState({answer: ""});
    const [checked, setChecked] = useState({var_1: false, var_2: false, var_3: false, var_4: false});


    const requestOptions = {
        method: "GET",
    };

    function decodeJWT() {
        const data = {
            jwt: localStorage.getItem("token")
        }

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data),
        };

        fetch(
            "http://192.168.100.27/Licenta/models/DecodeJWT.php",
            requestOptions
        )
            .then((response) => response.json())
            .then((dates) => {
                //this.props.setUser(dates.data.email);
                setState({
                    user: dates["JWT"]["data"]["email"]
                })
            })
    }

    function dataFunction() {
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
        fetch(
            "http://192.168.100.27/Licenta/models/SelectTrainingQuestion.php",
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Nu exista intrebari.") {
                    setErrorData({message: "Nu exista intrebari."})
                } else {
                    setQuestionData({
                        question: data.question,
                        var_1: data.var_1,
                        var_2: data.var_2,
                        var_3: data.var_3,
                        var_4: data.var_4,
                        correct_answer: data.correct_answer
                    })
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorData({message: "Date invalide."})
            });
    }

    function changePoints(parameter) {
        const data = {
            email: state.user
        }
        const requestOptions = {
            method: "POST",
            body: JSON.stringify(data)
        }
        if (parameter === "add") {
            fetch(
                "http://192.168.100.27/Licenta/models/CreateTokenAddPoints.php",
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('token', data.JWT);
                })
        } else if (parameter === "decrement") {
            fetch(
                "http://192.168.100.27/Licenta/models/CreateTokenDecrementPoints.php",
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('token', data.JWT);
                })
        }

    }

    React.useEffect(() => {
        decodeJWT();
        dataFunction();
    }, []);


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

    const handleSubmit = e => {
        e.preventDefault();

        if (!selectedAnswer.answer) {
            setSubmitMessage({message: "Trebuie sa alegi o variantă!"})
        } else {
            setSubmitForm({value: true})
        }

        if (selectedAnswer.answer === questionData.correct_answer) {
            setSubmitMessage({message: "Raspuns corect, ai primit 5 puncte!"})
            changePoints("add");
        } else {
            if (selectedAnswer.answer) {
                setSubmitMessage({message: "Raspuns gresit, ai pierdut 5 puncte!"})
                changePoints("decrement");
            }
        }


    }

    return (
        <div className="centerContent">
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
                                {!submitForm.value &&
                                <button disabled={submitForm.value} className="btn btn-primary btn-block">Submit
                                </button>}

                                {submitForm.value &&
                                <button className="btn btn-primary btn-block" onClick={dataFunction}>Next</button>}
                            </div>
                        </div>

                        <div className="errorSubmit">
                            {submitMessage.message}
                        </div>
                    </FormControl>
                </form>
            </div>
        </div>
    )
}
