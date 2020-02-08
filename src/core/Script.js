import Displayable from './Displayable.js'
import { ScriptComponent } from '../components/ScriptComponent.jsx'
import Events from './Events.js'
import GUI from './GUI.js'
import Graphics from '../gl/Graphics.js'

class Script extends Displayable {
  time = null
  __className = 'displayable-struct script-parameters'
  __displayable = ScriptComponent

  __gui = GUI.default
  __canvasParameters = {
    type: GUI.PanelType.Regular,
    width: 800,
    height: 600,
    pos: { x: 0, y: 0 },
    id: 'main-canvas'
  }

  constructor() {
    super()
    Events.addEventListener(Events.Type.ParameterChanged, [
      this.onValidate, this
    ])
  }

  onValidate(_) {
  }

  onResize(width, height) { }

  __onResize(width, height) {
    // Graphics.resizeCanvas(width, height)
    this.onResize(width, height)
  }

}

export default Script
