import React from "react"
import ReactDom from 'react-dom'
import { Hello, Param } from './components/Hello/Hello.jsx'
import Test from './components/Test/Test.jsx'
import "./assets/bootstrap/css/bootstrap.min.css"
import "./assets/css/reset.css"
var app = document.getElementById("app")

ReactDom.render( < Param / > , app)