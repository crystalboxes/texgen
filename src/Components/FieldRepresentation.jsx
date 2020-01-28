import React, { Component } from "react"

export class FieldRepresentation extends Component {
  constructor(props) {
    super(props)
    this.name = props.name
    this.state = {
      value: props.default
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return <div>
      <span>{this.name}: {this.state.value}</span>
    </div>
  }
  handleInputChange(event) {
    let value = event
    if (typeof event === 'object') {
      const target = event.target;
      value = target.type === 'checkbox' ? target.checked : target.value;
    }

    this.setState({
      value: value
    });
  }
}

export class Toggle extends FieldRepresentation {
  render() {
    return <div>
      <span>{this.name}: {this.state.value}</span>
      <input
        name={this.name}
        type="checkbox"
        checked={this.state.value}
        onChange={this.handleInputChange}
      />
    </div>
  }
}
