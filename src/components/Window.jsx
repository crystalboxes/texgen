import React, { Component } from "react"
import { ResizableBox } from "react-resizable"
import Draggable from 'react-draggable'
import { CollapseToggle } from './CollapseToggle.jsx'

export class Window extends Component {
  constructor(props) {
    super(props)
    const defaultWindowSize = 200
    this.width = props.width || defaultWindowSize
    this.height = props.height || defaultWindowSize
    this.title = props.title || '';
    this.state = { showParameters: true, currentWidth: this.width }
  }

  handleOpenCallback(value) {
    this.state.showParameters = value
    this.setState(this.state)
  }

  get content() {
    return this.state.showParameters
      ?
      <ResizableBox
        width={this.width * 1}
        height={this.height * 1}
        className='window'
        handleSize={[10, 10]}
        onResize={this.handleOnResize.bind(this)}
      >{this.props.children}
      </ResizableBox>
      : ''
  }

  handleOnResize(_, data) {
    this.state.currentWidth = data.size.width
    this.setState(this.state)
  }

  render() {
    return <Draggable handle="strong">
      <div>
        <div className='params' style={{ width: this.state.currentWidth + 'px' }}>
          <strong className="cursor">
            <div>
              <CollapseToggle
                className='collapse-button'
                callback={this.handleOpenCallback.bind(this)} />
              {this.title}
            </div>
          </strong>
          {this.content}
        </div>
      </div>
    </Draggable>
  }
}
