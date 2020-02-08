import React, { Component } from "react"
import { CanvasComponent } from "./CanvasComponent.jsx"
import GUI from "../core/GUI.js"
import { Window } from "./Window.jsx"
import Events from "../core/Events.js"

export class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }

  renderCanvas() {
    let script = this.instance.script
    let canvasParameters = script.__canvasParameters
    let width = canvasParameters.width
    let height = canvasParameters.height

    let el = React.createElement(CanvasComponent, canvasParameters)
    if (canvasParameters.type === GUI.PanelType.Window) {
      return <Window title='Video Out'
        width={CanvasComponent.getRenderSize(width)}
        height={CanvasComponent.getRenderSize(height)}
        onResize={this.onResize.bind(this)}
        pos={canvasParameters.pos}>
        {el}
      </Window>
    }
    return el
  }

  onResize(data) {
    Events.invoke(Events.Type.CanvasResized, data)
    this.instance.script.__onResize(data.width, data.height)
  }

  render() {
    return <div>
      {this.renderCanvas()}
      {React.createElement(
        this.instance.script.__displayable,
        { owner: this.instance.script }
      )}
    </div>
  }
}
