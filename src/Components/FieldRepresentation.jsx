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
    return <div className="param-field">
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
    return <div className="param-field">
      <input
        name={this.name}
        type="checkbox"
        checked={this.state.value}
        onChange={this.handleInputChange}
      />
      <label for={this.name}>{this.name}</label>
    </div>
  }
}
