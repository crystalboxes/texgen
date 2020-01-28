import React from "react"
import ReactDOM from "react-dom"
import {TexGen} from "./Behaviors/TexGen.js"
import App from './Core/App.js'
import { AppComponent } from './Components/AppComponent.jsx'

let app = new App(new TexGen)
ReactDOM.render(<AppComponent instance={app} />, document.getElementById("main"))
app.onApplicationStart()
