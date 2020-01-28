import Graphics from "../gl/Graphics.js"
import Displayable from './Displayable.js'

class Script extends Displayable {
  time = null
}


class App {
  rect = null
  time = {
    previousTime:0,
    currentTime:0,
    deltaTime:0
  }

  constructor(script) {
    this.script = script
    // since the DOM is generated on React's 'render' call constructor will do nothing
  }

  onApplicationStart() {
    Graphics.init(document.getElementById('app-display'))
    // initialize gl context here

    this.script.time = this.time

    this.script.onStart()
    let that = this
    function drawLoop() {
      that.script.onUpdate()
    }

    requestAnimationFrame(drawLoop)

    // start requestAnimationFrame loop
    // call the script
    // run all the callbacks and pipe them into loaded script
  }
}

export default {App, Time}
