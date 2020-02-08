import React, { Component } from "react"
import Events from "../core/Events.js"
import { DisplayableComponent } from "./DisplayableComponent.jsx"

export class LabelComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    this.state = { text: this.owner.text }
    Events.registerEventType('LabelChanged')
    Events.addEventListener(Events.Type.LabelChanged, this.onTextChanged.bind(this))
  }

  onTextChanged(value) {
    this.setState({ text: this.owner.text })
  }

  render() {
    return <div className='param-field'><span>{this.state.text}</span></div>
  }
}
