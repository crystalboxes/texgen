import Shader from './Shader.js'
import Rect from './Rect.js'

let gl = null
let rect = null

function err(msg) {
  console.error(msg)
}

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
  }

  static drawRect(x,y,w,h, color) {
    rect.draw(x,y,w,h, color)
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