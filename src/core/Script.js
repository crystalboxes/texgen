import Displayable from './Displayable.js'
import { ScriptComponent } from '../components/ScriptComponent.jsx'

class Script extends Displayable {
  time = null
  _className = 'displayable-struct script-parameters'
  _displayable = ScriptComponent
  _v2 = true
}
export default Script
