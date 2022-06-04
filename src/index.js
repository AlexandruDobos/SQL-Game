import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

//http://192.168.100.27 Iasi
//http://192.168.1.7 Tara

let hotspot = "http://172.20.10.14"
let iasi = "http://192.168.100.27"
let tara = "http://192.168.1.4"
let facultate = "http://10.20.0.31"

let IPv4;
export default IPv4 = tara;

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
