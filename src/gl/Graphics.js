import Shader from './Shader.js'
import SolidShape from './SolidShape.js'
import Color from '../core/Color.js'

let gl = null
let rect = new SolidShape()
let currentFbo = null

function err(msg) {
  console.error(msg)
}

class State {
  color = Color.makeFloat(1, 1, 1, 1)
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
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    canvas.style.width = canvas.width / window.devicePixelRatio + 'px'
    canvas.style.height = canvas.height / window.devicePixelRatio + 'px'

    Graphics.setViewport()
    rect.init()
  }

  static get width() {
    return Graphics.resolution.width
  }
  
  static get height() {
    return Graphics.resolution.height
  }

  static get resolution() {
    return {
      width:  currentFbo ? currentFbo.width :  gl.canvas.width,
      height:  currentFbo ? currentFbo.height :  gl.canvas.height
    }
  }

  static get currentFbo() {
    return currentFbo
  }

  static set currentFbo(value) {
    currentFbo = value
  }

  static setColor(color) {
    state.color = color
  }

  static drawRect(x, y, w, h, color) {
    rect.draw(rect.shapeType.rect, x, y, w, h, Color.validate(color) || state.color)
  }

  static drawImage(image, x, y, w, h) {
    if (!image.texture) {
      return
    }
    w = w || image.width
    h = h || image.height
    rect.draw(image, x, y, w, h)
  }

  static get circleResolution() {
    return rect.shapes.circle.resolution
  }

  static set circleResolution(value) {
    rect.setCircleResolution(value)
  }

  static drawCircle(x, y, r, color) {
    rect.draw(rect.shapeType.circle, x, y, r, r, Color.validate(color) || state.color)
  }

  static setViewport(x, y, w, h) {
    gl.viewport(x || 0, y || 0, w || gl.canvas.width, h || gl.canvas.height)
  }

  static clearColor(color) {
    color = Color.validate(color) || Color.validate(0)
    gl.clearColor(color.r, color.g, color.b, color.a)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Enable transparency
    // TODO move to a separate function (if it's necessary)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
  }

  static get gl() {
    return gl
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