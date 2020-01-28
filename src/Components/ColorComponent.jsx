import React from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'

export class ColorComponent extends DisplayableComponent {
  render() {
    return <div className='color-comp'>
      {this.getTitle()}
      {this.getElements()}
    </div>
  }
}
