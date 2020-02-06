

import React from "react"
import ReactDOM from "react-dom"
import App from './core/App.js'
import { AppComponent } from './components/AppComponent.jsx'
import { TexGen } from './behaviors/obsolete/TexGen.js'
import './style.scss'

const renderApp = true
let comp = null
let instance = null
if (renderApp) {
  instance = new TexGen
  let screenSize = 1280
  var app = new App(instance, {
    width: screenSize,
    height: screenSize, id: 'app-display'
  })
  comp = <AppComponent instance={app} />
}


ReactDOM.render(
  <div>
    {comp}</div>, document.getElementById("main"))
if (renderApp) {
  app.onApplicationStart()
}
