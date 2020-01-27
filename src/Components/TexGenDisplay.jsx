import React, {Component} from "react"
import {utils} from "../Utils/utils.js"

export class TexGenDisplay extends Component {
  constructor(props) {
    super(props)
    this.instance = props.instance
  }

  getReflectionData() {
    let _o = Object
    console.log(_o.entries(this.instance).filter(o => _o.keys(o[1]).includes("visible")))
    
    return "" + utils.isObject(this.instance) + keys + vals
  }

  render() {
    return <span>{this.getReflectionData()}</span>
  }
}