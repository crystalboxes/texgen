import Displayable from './Displayable.js'
import { ScriptComponent } from '../components/ScriptComponent.jsx'
import Events from './Events.js'

class Script extends Displayable {
  time = null
  _className = 'displayable-struct script-parameters'
  _displayable = ScriptComponent

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
