import React, { Component } from "react"
import { DisplayableComponent } from "./DisplayableComponent.jsx"

export class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }
  render() {
    return <div>
      <canvas id='app-display' />
      <div id='app-parameters'>
        <DisplayableComponent instance={this.instance.script} />
      </div>
    </div>
  }
}
