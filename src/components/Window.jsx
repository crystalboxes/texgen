import React, { Component } from "react"
import { ResizableBox } from "react-resizable"
import Draggable from 'react-draggable'
import { CollapseToggle } from './CollapseToggle.jsx'
import { Scrollbars } from 'react-custom-scrollbars';

export class Window extends Component {
  constructor(props) {
    super(props)
    const defaultWindowSize = 200
    this.width = props.width || defaultWindowSize
    this.height = props.height || defaultWindowSize
    this.title = props.title || '';
    this.state = { showParameters: true, currentWidth: this.width, currentHeight: this.height }
  }

  handleOpenCallback(value) {
    this.state.showParameters = value
    this.setState(this.state)
  }

  get content() {
    return this.state.showParameters
      ?
      <ResizableBox
        width={this.state.currentWidth * 1}
        height={this.state.currentHeight * 1}
        className='window'
        handleSize={[10, 10]}
        onResize={this.handleOnResize.bind(this)}
      >
        <Scrollbars
          style={{ width: this.state.currentWidth + 'px', height: this.state.currentHeight + 'px' }}
        >{this.props.children}</Scrollbars>
      </ResizableBox>
      : ''
  }

  handleOnResize(_, data) {
    this.state.currentWidth = data.size.width
    this.state.currentHeight = data.size.height
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
