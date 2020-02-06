import Displayable from './Displayable.js'
import { ScriptComponent } from '../components/ScriptComponent.jsx'
import Events from './Events.js'
import GUI from '../core/gui/GUI.js'

class Script extends Displayable {
  time = null
  _className = 'displayable-struct script-parameters'
  _displayable = ScriptComponent

  _gui = GUI.default
  _type = GUI.PanelType.Window

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
