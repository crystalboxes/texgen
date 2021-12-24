import React, { Component } from "react";
import { FieldRepresentation } from "./FieldRepresentation.jsx";

import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export class NumberField extends FieldRepresentation {
  constructor(props) {
    super(props);
    // check value
    let is01 = this.state.value > -0.0001 && this.state.value < 1.0001;
    let defaults = {
      rmax: is01 ? 1.0 : 100,
      step: is01 ? 0.0001 : 1,
    };
    this.options = {
      rangeMin: props.data && "rangeMin" in props.data ? props.data.rangeMin : 0,
      rangeMax: props.data && "rangeMax" in props.data ? props.data.rangeMax : defaults.rmax,
      step: props.data && "step" in props.data ? props.data.step : defaults.step,
    };
  }
  render() {
    return (
      <div className="param-field">
        <Slider
          name={this.name}
          min={this.options.rangeMin}
          max={this.options.rangeMax}
          step={this.options.step}
          value={this.state.value}
          defaultValue={this.state.value}
          onChange={this.handleInputChange}
        />
        <p className="slider-text">
          {this.labelName} <span className="slider-value">{this.state.value}</span>
        </p>
      </div>
    );
  }
}
