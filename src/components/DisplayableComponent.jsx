import React, { Component } from "react"
import {
  FieldRepresentation,
  Toggle
} from './FieldRepresentation.jsx'
import { NumberField } from './NumberField.jsx'
import { Collapse } from "./Collapsable.jsx"

export class DisplayableComponent extends Component {
  constructor(props) {
    super(props)
    if ('title' in props) {
      this.title = props.title
    }
  }

  get owner() {
    return this.props.owner
  }

  getParsedParameters() {
    let entries = []
    entries = Object.entries(this.owner).filter(x => !x[0].startsWith('_'))
      .filter(x => {
        if ('__includeParams' in this.owner && Array.isArray(this.owner.__includeParams)) {
          return this.owner.__includeParams.includes(x[0])
        } else if ('__excludeParams' in this.owner && Array.isArray(this.owner.__excludeParams)) {
          return !this.owner.__excludeParams.includes(x[0])
        } else {
          return true
        }
      })

    let isDisplayable = function (o) {
      return typeof o === 'object' && '__displayable' in o
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

        if ('__paramsConfig' in this.owner && displayName in this.owner.__paramsConfig) {
          var e = Object.entries(this.owner.__paramsConfig[displayName])
          e.push(['value', val])
          return {
            name: displayName,
            valueType: typeof val,
            value: val,
            data: Object.fromEntries(e)
          }
        }

        if (valueType === 'object') {
          // It's a field with additional attributes required to pass to the component
          // if ('value' in val) {
          //   object = val
          //   displayName = 'displayName' in object ? object.displayName : displayName
          //   valueType = typeof val.value
          //   val = val.value
          // } else {
          if (!isDisplayable(val)) {
            return null
          }
          // }
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
                owner: element
              }))
            }
            return elems
          case 'object':
            if ('__displayable' in v.value) {
              return addElement(v.value.__displayable, { key: keyId, title: v.name, owner: v.value })
            } else {
              return addElement(DisplayableComponent, { key: keyId, title: v.name, owner: v.value })
            }
          default:
            return addElement(FieldRepresentation, attribs)
        }
      })
  }

  getTitle() {
    if (this.owner.__displayTitle.length > 0) {
      return <h3>{this.owner.__displayTitle}</h3>
    } else {
      return null;
    }
  }

  get collapseTitle() {
    if (this.owner.__displayTitle.length == 0) {
      return this.props.title
    } else {
      return this.owner.__displayTitle
    }
  }

  render() {
    if (!('__className' in this.owner)) {
      console.error("something is wrong")
    }
    let isCollapsable = false
    let collapsed = false
    let cType = typeof this.owner.__collapsable
    if (cType === 'boolean') {
      isCollapsable = this.owner.__collapsable
    } else if (cType === 'object') {
      collapsed = this.owner.__collapsable.collapsed
      isCollapsable = true
    }
    if (isCollapsable) {
      return <Collapse title={this.collapseTitle} collapsed={collapsed} containerClassName={this.owner.__className}>{this.getElements()}</Collapse>
    } else {
      return <div className={this.owner.__className}>{this.getTitle()}{this.getElements()}</div>
    }
  }
}