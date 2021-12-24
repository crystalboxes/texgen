import React, { Component } from "react";

export class CollapseToggle extends Component {
  constructor(props) {
    super(props);
    this.className = "className" in props ? props.className : "collapse-button";
    this.state = { open: "open" in props ? props.open : true };
    this.callback = props.callback;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.open = !this.state.open;
    this.callback(this.state.open);
    this.setState(this.state);
  }

  render() {
    return (
      <button className="collapse-button" onClick={this.handleClick}>
        {this.state.open ? "[-]" : "[+]"}
      </button>
    );
  }
}
