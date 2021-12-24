import React from "react";
import ReactDOM from "react-dom";
import { TexGen } from "./behaviors/TexGen.js";
import App from "./core/App.js";
import { AppComponent } from "./components/AppComponent.jsx";
import "./style.scss";

let screenSize = 1280;
let app = new App(new TexGen(), { width: screenSize, height: screenSize });
ReactDOM.render(<AppComponent instance={app} />, document.getElementById("main"));
app.onApplicationStart();
