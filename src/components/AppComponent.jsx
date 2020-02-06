import React, { Component } from "react"
import { DisplayableComponent } from "./DisplayableComponent.jsx"
import { CanvasComponent } from "./CanvasComponent.jsx"

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
      <div id='app-parameters' className='noselect'>
        {React.createElement(this.instance.script._displayable,
          { instance: this.instance.script })}
      </div>
    </div>
  }
}
