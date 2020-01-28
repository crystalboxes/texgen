import React, { Component } from "react"
import {
  FieldRepresentation,
  Toggle
} from './FieldRepresentation.jsx'
import {NumberField} from './NumberField.jsx'

export class DisplayableComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
    if ('title' in props) {
      this.title = props.title
    }
  }

  getParsedParameters() {
    return Object.entries(this.instance.params)
      .map(x => {
        let displayName = x[0]
        let val = x[1]
        let object = null
        let valueType = typeof val
        // Special array type since the array is 'object' as well
        if (Array.isArray(val)) {
          valueType = 'array'
        }
        if (valueType === 'object' && 'value' in val) {
          // It's a field with additional attributes required to pass to the component
          object = val
          displayName = 'displayName' in object ? object.displayName : displayName
          valueType = typeof val.value
          val = val.value
        }
        return { name: displayName, valueType: valueType, value: val, data: object }
      })
  }

  getElements() {
    return this.getParsedParameters()
      .map(v => {
        let keyId = v.name + "_" + Math.random() * (new Date).getMilliseconds() 
        let attribs = {
          name: v.name,
          key: keyId,
          default: v.value,
          data: v.data
        }
        switch (v.valueType) {
          case 'number':
            // data contains stuff like bounds etc.
            return React.createElement(NumberField, attribs)
          case 'boolean':
            return React.createElement(Toggle, attribs)
          case 'array':
            // It's required that incoming structs are derived from Displayable
            if (v.value.length == 0) {
              return []
            }
            let i = 0
            const displayTitle = false
            let elems = displayTitle ? [React.createElement('h3', {key: i}, [v.name])] : []
            for (let element of v.value) {
              elems.push(React.createElement(DisplayableComponent, {
                key: keyId + i++,
                instance: element
              }))
            }
            return elems
          case 'object':
            if ('display' in v.value) {
              return React.createElement(v.value.display, { key: keyId, title: v.name, instance: v.value })
            } else {
              return React.createElement(DisplayableComponent, {key: keyId, title: v.name, instance: v.value})
            }
          default:
            return React.createElement(FieldRepresentation, attribs)
        }
      })
  }

  getTitle() {
    if (this.title) {
      return <h3>{this.title}</h3>
    } else {
      return null;
    }
  }

  render() {
    return <div className={this.instance.className}>{this.getElements()}</div>
  }
}