

import React from "react"
import ReactDOM from "react-dom"
import { Window } from "./components/Window.jsx"

import { MyApp } from "./behaviors/MyApp.js"
import App from './core/App.js'
import { AppComponent } from './components/AppComponent.jsx'
import './style.scss'

const renderApp = false
let comp = null
if (renderApp) {
  let screenSize = 1280
  var app = new App(new MyApp, { width: screenSize, height: screenSize, id: 'app-display' })
  comp = <AppComponent instance={app} />
}


ReactDOM.render(
  <div>
    {comp}
    <Window width='200' height='200' title='hello sdsd world'>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </Window></div>, document.getElementById("main"))
if (renderApp) {
  app.onApplicationStart()
}
