import React, { Component } from "react"

export class Collapse extends Component {
  constructor(props) {
    super(props)
    let collapsed = props.collapsed || false
    this.state = {
      showParameters: !collapsed
    }
    this.className = props.className || 'toggle-div'
    this.containerClassName = props.containerClassName || 'container-div'
  }

  handleOpenCallback() {
    this.state.showParameters = !this.state.showParameters
    this.setState(this.state)
  }

  get content() {
    return React.createElement('div', { style: this.state.showParameters ? null : { display: 'none' }, children: this.props.children })
  }

  render() {
    return <div className={this.containerClassName}>
      <strong className={"cursor " + this.className + ' ' + (!this.state.showParameters ? 'collapsed' : 'not-collapsed')}>
        <div>
          <button
            className="collapse-button"
            onClick={this.handleOpenCallback.bind(this)}>
            {this.state.showParameters ? "[-]" : "[+]"}
          </button>
          {this.props.title}
        </div>
      </strong>
      {this.content}
    </div>
  }
} 