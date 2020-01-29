import Displayable from './Displayable.js'
import {ScriptComponent} from '../components/ScriptComponent.jsx'

class Script extends Displayable {
  time = null
  viewSettings = {
    className: 'displayable-struct script-parameters'
  }
  display = ScriptComponent
}
export default Script
