import React, { Component } from "react"
import { ResizableBox } from "react-resizable"
import Draggable from 'react-draggable'
import { Scrollbars } from 'react-custom-scrollbars'
import { Collapse } from "./Collapsable.jsx";

// Props:
// width, height, title, pos{x,y}, onResize

export class Window extends Component {
  constructor(props) {
    super(props)
    const defaultWindowSize = 200
    let width = props.width || defaultWindowSize
    let height = props.height || defaultWindowSize
    this.title = props.title || '';
    let x =  0
    let y =  0
    if (props.pos != null) {
      x = props.pos.x
      y = props.pos.y
    }
    this.onResizeCallback = props.onResize
    this.state = {
      currentWidth: width,
      currentHeight: height,
      pos: { x: x, y: y }
    }
  }

  get content() {
    return <ResizableBox
        width={this.state.currentWidth * 1}
        height={this.state.currentHeight * 1}
        className='window'
        handleSize={[10, 10]}
        onResize={this.handleOnResize.bind(this)}
      >
        <Scrollbars
          style={{ width: this.state.currentWidth + 'px', height: (this.state.currentHeight + 4) + 'px' }}
        >{this.props.children}</Scrollbars>
      </ResizableBox>
  }

  handleOnResize(_, data) {
    this.state.currentWidth = data.size.width
    this.state.currentHeight = data.size.height
    this.setState(this.state)
    if (this.onResizeCallback != null) {
      this.onResizeCallback({
        width: this.state.currentWidth,
        height: this.state.currentHeight
      })
    }
  }

  render() {
    return <Draggable defaultPosition={this.state.pos}  handle=".handle">
      <div>
        <div className='params' style={{ width: this.state.currentWidth + 'px' }}>
          <Collapse className='handle' title={this.title}>
            {this.content}
          </Collapse>
        </div>
      </div>
    </Draggable>
  }
}
