import Displayable from "./Displayable.js"
import {LabelComponent} from "../components/LabelComponent.jsx"
import Events from "./Events.js"

class Label extends Displayable {
  constructor(defaultValue) {
    super()
    this.innerText = defaultValue
    this.labelChangedCallback = null
  }
  

  get text() {
    return this.innerText
  }
  set text(value) {
    this.innerText = value
    Events.invoke(Events.Type.LabelChanged, {value: value}, this)
  }
  __displayable = LabelComponent
  __includeParams = []

}

export default Label