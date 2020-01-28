import React from "react"
import ReactDOM from "react-dom"
import {TexGen} from "./behaviors/TexGen.js"
import App from './core/App.js'
import { AppComponent } from './components/AppComponent.jsx'

let app = new App(new TexGen, {width: 800, height: 600})
ReactDOM.render(<AppComponent instance={app} />, document.getElementById("main"))
app.onApplicationStart()
