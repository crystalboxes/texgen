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
        switch (v.valueType) {
          case 'number':
            // data contains stuff like bounds etc.
            return <NumberField name={v.name} key={keyId} default={v.value} data={v.data} />
          case 'boolean':
            return <Toggle name={v.name} key={keyId} default={v.value} />
          case 'array':
            // It's required that incoming structs are derived from Displayable
            if (v.value.length == 0) {
              return []
            }
            let i = 0
            let elems = [<h3 key={i}>{v.name}</h3>]
            for (let element of v.value) {
              elems.push(<DisplayableComponent key={keyId + i++} instance={element} />)
            }
            return elems
          case 'object':
            if ('display' in v.value) {
              return React.createElement(v.value.display, { key: keyId, title: v.name, instance: v.value })
            } else {
              return <DisplayableComponent key={keyId} title={v.name} instance={v.value} />
            }
          default:
            return <FieldRepresentation name={v.name} key={keyId} default={v.value} />
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
    return <div className={this.instance.getClassName()}>{this.getTitle()}{this.getElements()}</div>
  }
}