

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
  let params = instance.__canvasParameters
  params.pos.x = 212
  params.pos.y = 6
  instance.__canvasParameters.width = screenSize
  instance.__canvasParameters.height = screenSize

  var app = new App(instance)
  comp = <AppComponent instance={app} />
}


ReactDOM.render(
  <div>
    {comp}</div>, document.getElementById("main"))
if (renderApp) {
  app.onApplicationStart()
}
