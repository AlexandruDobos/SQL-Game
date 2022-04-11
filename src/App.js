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
import {Forgot} from "./components/forgot";


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
                            <Route exact path="/forgot" component={Forgot}/>
                            <Route exact path="/training" component={() => <Training/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}
