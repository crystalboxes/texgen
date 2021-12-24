import React, { Component } from "react";
import Events from "../core/Events";

export class FieldRepresentation extends Component {
  constructor(props) {
    super(props);
    this.name = props.name;
    this.owner = props.owner;
    this.state = {
      value: props.default,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  render() {
    return (
      <div className="param-field">
        <span>
          {this.labelName} {this.state.value}
        </span>
      </div>
    );
  }

  get labelName() {
    // https://stackoverflow.com/a/4149393
    return (
      this.name
        // insert a space before all caps
        .replace(/([A-Z])/g, " $1")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  }

  handleInputChange(event) {
    let value = event;
    if (typeof event === "object") {
      const target = event.target;
      value = target.type === "checkbox" ? target.checked : target.value;
    }
    // set value
    let ob = this.owner[this.name];
    if (typeof ob === "object") {
      ob.value = value;
    } else {
      this.owner[this.name] = value;
    }

    Events.invoke(Events.Type.ParameterChanged, { name: this.name }, this.owner);

    this.setState({
      value: value,
    });
  }
}

export class Toggle extends FieldRepresentation {
  render() {
    return (
      <div className="param-field">
        <input name={this.name} type="checkbox" checked={this.state.value} onChange={this.handleInputChange} />
        <label htmlFor={this.name}>{this.labelName}</label>
      </div>
    );
  }
}
