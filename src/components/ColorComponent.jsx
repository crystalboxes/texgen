import React, { Component } from "react"
import { DisplayableComponent } from './DisplayableComponent.jsx'
import { SketchPicker } from 'react-color'
import { Color } from '../core/Color.js'
import { CollapseToggle } from './CollapseToggle.jsx'
import Events from '../core/Events.js'

function getRgbaColor(c) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${1.0})`
}

export class ColorComponent extends DisplayableComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.name = props.title

    this.state = {
      color: {
        rgb: {
          r: this.owner.r,
          g: this.owner.g,
          b: this.owner.b,
          a: this.owner.a,
        }
      },
      collapsed: true
    }
  }

  handleChange(color, event) {
    this.state.color.rgb = color.rgb
    Events.invoke(Events.Type.ParameterChanged, {name: this.name}, this.owner)

    this.setState(this.state)

    this.owner.r = color.rgb.r
    this.owner.g = color.rgb.g
    this.owner.b = color.rgb.b
    this.owner.a = color.rgb.a
  }

  collapseChange(ev) {
    this.state.collapsed = !this.state.collapsed
    this.setState(this.state)
  }


  get color() {
    return this.state.color.rgb
  }

  get inverted() {
    return getRgbaColor(
      {
        r: 255 - this.state.color.rgb.r,
        g: 255 - this.state.color.rgb.g,
        b: 255 - this.state.color.rgb.b,
        a: this.state.color.rgb.a,
      }
    )
  }

  collapsedState() {
    return <div
      className='param-field'
      style={
        {
          backgroundColor: getRgbaColor(this.color),
          color: this.inverted
        }
      }>
      {this.title}
      <CollapseToggle open={false} callback={this.collapseChange.bind(this)} />
    </div>
  }

  fullState() {
    return <SketchPicker
      disableAlpha={!('alpha' in this.owner)} 
      color={this.state.color.rgb}
      onChange={this.handleChange}
      // onChangeComplete={this.handleChangeComplete}
      width='inherit'
      style={{
        padding: 'inherit'
      }}
      presetColors={[]}
    />
  }

  render() {
    const defaultClassName = 'color-comp'
    const col = this.state.collapsed

    return <div className={defaultClassName}>
      <div
        className='param-field'
        style={
          {
            backgroundColor: col ? getRgbaColor(this.state.color.rgb) : 'inherit',
            color: col ? this.inverted : 'inherit'
          }
        }>
        {this.title}
        <CollapseToggle open={!this.state.collapsed} callback={this.collapseChange.bind(this)} />
      </div>
      {
        col ? null : this.fullState()
      }
    </div>
  }
}
