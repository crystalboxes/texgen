import React, { Component } from "react"
import {
  FieldRepresentation,
  Toggle
} from './FieldRepresentation.jsx'
import { NumberField } from './NumberField.jsx'

export class DisplayableComponent extends Component {
  constructor(props) {
    super(props)
    this.owner = props.instance
    if ('title' in props) {
      this.title = props.title
    }
  }

  getParsedParameters() {
    let entries = []
    entries = Object.entries(this.owner).filter(x => !x[0].startsWith('_'))
      .filter(x => {
        if ('_params' in this.owner && Array.isArray(this.owner._params)) {
          return this.owner._params.includes(x[0])
        } else if ('_excludeParamNames' in this.owner && Array.isArray(this.owner._excludeParamNames)) {
          return !this.owner._excludeParamNames.includes(x[0])
        } else {
          return true
        }
      })

    let isDisplayable = function (o) {
      return typeof o === 'object' && '_displayable' in o
    }

    return entries
      .map(x => {
        let displayName = x[0]
        let val = x[1]
        let object = this.owner
        let valueType = typeof val

        if (val == null) {
          return null
        }

        // Special array type since the array is 'object' as well
        if (Array.isArray(val)) {
          valueType = 'array'
          // check for illegal objects inside
          for (let o of val) {
            if (typeof o === 'object' && !isDisplayable(o)) {
              return null
            }
          }
        }

        if (valueType === 'object') {
          if ('value' in val) {
            // It's a field with additional attributes required to pass to the component
            object = val
            displayName = 'displayName' in object ? object.displayName : displayName
            valueType = typeof val.value
            val = val.value
          } else {
            if (!isDisplayable(val)) {
              return null
            }
          }
        }
        return { name: displayName, valueType: valueType, value: val, data: object }
      }).filter(x => x !== null)
  }

  getElements() {
    return this.getParsedParameters()
      .map(v => {
        let keyId = v.name + "_" + Math.random() * (new Date).getMilliseconds()
        let attribs = {
          name: v.name,
          key: keyId,
          default: v.value,
          data: v.data,
          owner: this.owner
        }
        function addElement(constructor, attribs, ch) {
          return React.createElement(constructor, attribs, ch)
        }
        switch (v.valueType) {
          case 'number':
            // data contains stuff like bounds etc.
            return addElement(NumberField, attribs)
          case 'boolean':
            return addElement(Toggle, attribs)
          case 'array':
            // It's required that incoming structs are derived from Displayable
            if (v.value.length == 0) {
              return []
            }
            let i = 0
            const displayTitle = false
            let elems = displayTitle ? [addElement('h3', { key: i }, [v.name])] : []
            for (let element of v.value) {
              elems.push(addElement(DisplayableComponent, {
                key: keyId + i++,
                instance: element
              }))
            }
            return elems
          case 'object':
            if ('_displayable' in v.value) {
              return addElement(v.value._displayable, { key: keyId, title: v.name, instance: v.value })
            } else {
              return addElement(DisplayableComponent, { key: keyId, title: v.name, instance: v.value })
            }
          default:
            return addElement(FieldRepresentation, attribs)
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
    if (!('_className' in this.owner)) {
      console.error("something is wrong")
    }
    return <div className={this.owner._className}>{this.getElements()}</div>
  }
}