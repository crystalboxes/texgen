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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      value: value
    });
  }
}

export class NumberField extends FieldRepresentation {
  constructor(props) {
    super(props)
    // check value 
    let is01 = this.state.value > -0.0001 && this.state.value < 1.0001
    let defaults = {
      rmax: is01 ? 1.0 : 100,
      step: is01 ? .0001 : 1
    }
    this.options = {
      rangeMin: props.data && 'rangeMin' in props.data ? props.data.rangeMin : 0,
      rangeMax: props.data && 'rangeMax' in props.data ? props.data.rangeMax : defaults.rmax,
      step: props.data && 'step' in props.data ? props.data.step : defaults.step
    }
  }
  render() {
    return <div>
      <span>{this.name}: {this.state.value}</span>
      <input
        name={this.name}
        type="range"
        min={this.options.rangeMin}
        max={this.options.rangeMax}
        value={this.state.value}
        step={this.options.step}
        onChange={this.handleInputChange}
      />
    </div>
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
