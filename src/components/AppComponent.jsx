import React, { Component } from "react"
import { CanvasComponent } from "./CanvasComponent.jsx"
import GUI from "../core/GUI.js"

export class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }

  renderCanvas() {
    return React.createElement(CanvasComponent, this.instance.settings)
  }

  render() {
    return <div>
      {this.renderCanvas()}
      {React.createElement(
        this.instance.script.__displayable,
        { instance: this.instance.script }
      )}
    </div>
  }
}
