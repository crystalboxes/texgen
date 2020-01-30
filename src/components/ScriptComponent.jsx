import React from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

export class ScriptComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    this.state = { open: true }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.open = !this.state.open
    this.setState(this.state);
  }

  getParamsContainer() {
    return this.state.open ? <div className='paramsContainer'>{this.getElements()}</div> : ''
  }

  render() {
    return <Draggable handle="strong">
      <div className={this.owner._className}>
        <strong className="cursor">
          <div>
            <button className="collapse-button" onClick={this.handleClick}>{this.state.open ? "[-]" : "[+]"}</button>
            Parameters
          </div>
        </strong>
        {this.getParamsContainer()}
      </div>
    </Draggable>
  }
}
