import React, { Component } from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'
import Draggable from 'react-draggable'
import { CollapseToggle } from './CollapseToggle.jsx'

export class ScriptComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    this.state = { showParameters: true }
  }

  handleOpenCallback(value) {
    this.setState({ showParameters: value })
  }

  getParamsContainer() {
    return this.state.showParameters
      ? <div className='paramsContainer'>{this.getElements()}</div>
      : ''
  }

  render() {
    return <Draggable handle="strong">
      <div className={this.owner._className}>
        <strong className="cursor">
          <div>
            <CollapseToggle className='collapse-button' callback={this.handleOpenCallback.bind(this)} />
            Parameters
          </div>
        </strong>
        {this.getParamsContainer()}
      </div>
    </Draggable>
  }
}
