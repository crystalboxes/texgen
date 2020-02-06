import Displayable from './Displayable.js'
import { ScriptComponent } from '../components/ScriptComponent.jsx'
import Events from './Events.js'
import GUI from './GUI.js'

class Script extends Displayable {
  time = null
  __className = 'displayable-struct script-parameters'
  __displayable = ScriptComponent

  __gui = GUI.default

  constructor() {
    super()
    Events.addEventListener(Events.Type.ParameterChanged, [
      this.onValidate, this
    ])
  }

  onValidate(val) {
  }
}

export default Script
