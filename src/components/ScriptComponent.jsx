import React from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'
import { Window } from "./Window.jsx"

export class ScriptComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    let gui = this.owner.__gui
    let typeofGui = typeof gui
    this.width = 200
    this.height = 300
    this.x = 0
    this.y = 0

    if (typeofGui === 'object') {
      this.width = gui.width || this.width
      this.height = gui.height || this.height
      this.x = gui.pos.x || this.x
      this.y = gui.pos.y || this.y
    }
  }

  render() {
    return <Window width={this.width} height={this.height} pos={{x: this.x, y: this.y}} title="Parameters">
      <div>{this.getElements()}</div>
    </Window>
  }
}
