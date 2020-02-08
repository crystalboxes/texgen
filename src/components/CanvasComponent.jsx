import React, { Component } from "react"
import Events from "../core/Events"
import Graphics from "../gl/Graphics"

export class CanvasComponent extends Component {
  constructor(props) {
    super(props)
    this.id = props.id
    this.state = {
      width: props.width,
      height: props.height
    }

    Events.addEventListener(
      Events.Type.CanvasResized,
      this.onCanvasResized.bind(this)
    )
  }

  static get pixelRatio() {
    return window.devicePixelRatio
  }

  static getRenderSize(dim) {
    return dim / CanvasComponent.pixelRatio
  }

  onCanvasResized(data) {
    data.width *= CanvasComponent.pixelRatio
    data.height *= CanvasComponent.pixelRatio
    this.setState({ width: data.width, height: data.height })
    Graphics.setViewport()
  }


  render() {
    return <canvas
      id={this.id}
      width={this.state.width}
      height={this.state.height}
      style={{
        width: CanvasComponent.getRenderSize(this.state.width) + 'px',
        height: CanvasComponent.getRenderSize(this.state.height) + 'px'
      }}></canvas>
  }
}
