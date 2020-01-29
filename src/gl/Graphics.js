import Shader from './Shader.js'
import SolidShape from './SolidShape.js'
import Color from '../core/Color.js'

let gl = null
let rect = new SolidShape()

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
    rect.init()
  }

  static setColor(color) {
    state.color = color
  }

  static drawRect(x, y, w, h, color) {
    rect.draw(rect.shapeType.rect, x, y, w, h, color ? color : state.color)
  }

  static drawImage(image, x,y,w,h) {
    if (!image.texture) {
      return
    }
    w = w | image.width
    h = h | image.height
    rect.draw(image, x,y,w,h)
  }
  
  static get circleResolution() {
    return rect.shapes.circle.resolution
  }

  static set circleResolution(value) {
    rect.setCircleResolution(value)
  }

  static drawCircle(x, y, r, color) {
    rect.draw(rect.shapeType.circle, x, y, r, r, color ? color : state.color)
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