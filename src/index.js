import {TexGenDisplay} from './Components/TexGenDisplay.jsx'
import React from "react"
import ReactDOM from "react-dom"
import {TexGen} from "./Behaviors/TexGen.js"

let tg = new TexGen()
ReactDOM.render(<TexGenDisplay instance={tg} />, document.getElementById("main"))
