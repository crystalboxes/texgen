import React, { Component } from "react"

export class CanvasComponent extends Component {
  constructor(props) {
    super(props)
    this.id = props.id
    this.width = props.width
    this.height = props.height
  }
  get renderWidth() {
    return this.width / window.devicePixelRatio
  }
  get renderHeigth() {
    return this.height / window.devicePixelRatio
  }
  render() {
    return <canvas
      id={this.id}
      width={this.width}
      height={this.height}
      style={{
        width: this.renderWidth + 'px',
        height: this.renderHeigth + 'px'
      }}></canvas>
  }
}
