import {DisplayableComponent} from './Components/DisplayableComponent.jsx'
import React from "react"
import ReactDOM from "react-dom"
import {TexGen} from "./Behaviors/TexGen.js"

let tg = new TexGen()
ReactDOM.render(<DisplayableComponent instance={tg} />, document.getElementById("main"))
