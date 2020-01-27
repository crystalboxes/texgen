import React, { Component } from "react"
import {
  FieldRepresentation,
  NumberField,
  Toggle
} from './FieldRepresentation.jsx'

export class DisplayableComponent extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }

  getElements() {
    let Ob = Object
    return Ob.entries(this.instance.params)
      .map(x => {
        let displayName = x[0]
        let val = x[1]
        let object = null
        let valueType = typeof val
        if (Array.isArray(val)) {
          valueType = 'array'
        }
        if (valueType === 'object') {
          object = val
          displayName = 'displayName' in object ? object.displayName : displayName
          valueType = typeof val.value
          val = val.value
        }
        return { name: displayName, valueType: valueType, value: val, data: object }
      })
      .map(v => {
        switch (v.valueType) {
          case 'number':
            return <NumberField name={v.name} key={v.name} default={v.value} data={v.data} />
          case 'boolean':
            return <Toggle name={v.name} key={v.name} default={v.value} />
          case 'array':
            if (v.value.length == 0) {
              return []
            }
            let i = 0
            let elems = [<h3 key={i}>{v.name}</h3>]
            for (let element of v.value) {
              elems.push(<DisplayableComponent key={i++} instance={element} />)
            }
            return elems
          default:
            return <FieldRepresentation name={v.name} key={v.name} default={v.value} />
        }
      })
  }

  render() {
    return <div>{this.getElements()}</div>
  }
}