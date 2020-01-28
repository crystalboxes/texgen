import React, { Component } from "react"
import { DisplayableComponent } from "./DisplayableComponent.jsx"

export class AppComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }
  render() {
    console.log(this.instance.script)
    console.log(this.instance.script.display)
    return <div>
      <canvas id='app-display'
        width={this.instance.settings.width}
        height={this.instance.settings.height}
      />
      <div id='app-parameters' className='noselect'>
        {React.createElement(this.instance.script.display, {instance: this.instance.script})}
      </div>
    </div>
  }
}
