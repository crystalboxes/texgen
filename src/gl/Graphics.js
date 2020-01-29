import Shader from './Shader.js'
import Rect from './Rect.js'
import Color from '../core/Color.js'
import RectV2 from './RectV2.js'

let gl = null
let rect = null
let rect2 = null

function err(msg) {
  console.error(msg)
}

class State {
  color = Color.makeFloat(1,1,1,1)
}

let state = new State

class Graphics {
  static init(canvas) {
    gl = canvas.getContext('webgl')
    if (!gl) {
      console.error("The browser doesn't support webgl, quitting...")
      return
    }
    // TODO handle resolution correctly
    canvas.width  = canvas.clientWidth
    canvas.height = canvas.clientHeight

    canvas.style.width = canvas.width / window.devicePixelRatio + 'px'
    canvas.style.height = canvas.height / window.devicePixelRatio + 'px'

    Graphics.setViewport()

    rect = new Rect()
    rect2 = new RectV2
  }

  static setColor(color) {
    state.color = color
  }

  static drawRect(x, y, w, h, color) {
    rect2.draw(x, y, w, h, color ? color : state.color)
  }

  static drawCircle(x, y, r, color) {

  }

  static setViewport(x, y, w, h) {
    gl.viewport(x | 0, y | 0, w | gl.canvas.width, h | gl.canvas.height)
  }

  static clearColor(color) {
    gl.clearColor(color.r, color.g, color.b, color.a)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  static get gl() {
    return gl
  }
  
  static get resolution() {
    return {
      width: gl.canvas.width, 
      height: gl.canvas.height
    }
  }

  static createShader(vtxSrc, fragSrc, errorCallback) {
    if (!errorCallback) {
      errorCallback = err
    }
    let getGlShader = function (shaderSource, shaderType) {
      if (shaderSource.endsWith('.glsl')) {
        shaderSource = require('./shaders/' + shaderSource)
      }

      const shader = gl.createShader(shaderType);
      gl.shaderSource(shader, shaderSource);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        errorCallback(`Compile error of ${shader}: ${gl.getShaderInfoLog(shader)}`)
        gl.deleteShader(shader);
        return null;
      }
      return shader
    }
    let program = gl.createProgram()
    gl.attachShader(program, getGlShader(vtxSrc, gl.VERTEX_SHADER))
    gl.attachShader(program, getGlShader(fragSrc, gl.FRAGMENT_SHADER))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      errorCallback(`Link error: ${gl.getProgramInfoLog(program)}`)
    }
    return new Shader(program)
  }

  static bindShader(shader) {
    gl.useProgram(shader.program)
  }
}

export default Graphics