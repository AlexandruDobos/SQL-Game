import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '../src/css/nav.css'
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Nav from '../src/components/nav';
import Home from '../src/components/home';
import Login from '../src/components/login'
import Register from '../src/components/register'
import Training from '../src/components/training'
import Forgot from "./components/forgot";
import Settings from "./components/settings";
import Admin from "./components/admin";
import Game from "./components/game"
import Challenges from "./components/challenges"
import AddQuestion from "./components/addquestion"
import ForgotPassConfirmed from "./components/forgotpassconfirmed";
export default function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Nav/>

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <Route exact path="/" component={() => <Home/>}/>
                            <Route exact path="/login" component={() => <Login/>}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/forgot" component={() => <Forgot/>}/>
                            <Route exact path="/training" component={() => <Training/>}/>
                            <Route exact path="/settings" component={() => <Settings/>}/>
                            <Route exact path="/admin" component={() => <Admin/>}/>
                            <Route exact path="/game" component={() => <Game/>}/>
                            <Route exact path="/challenges" component={() => <Challenges/>}/>
                            <Route exact path="/addquestion" component={() => <AddQuestion/>}/>
                            <Route exact path="/forgotpassconfirmed" component={() => <ForgotPassConfirmed/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
