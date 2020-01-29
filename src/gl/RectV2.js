import Graphics from './Graphics.js'
import {mat4} from 'gl-matrix'

class RectV2 {
  constructor() {
    let gl = Graphics.gl
    // make vertex buffer first
    this.shader = Graphics.createShader(
      'rect2.vert.glsl', 'rect2.frag.glsl')
    let program = this.shader.program
    this.vertexBuffer = gl.createBuffer()
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ]), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)
  }

  // it should draw the uv quad
  draw(x, y, w, h, color) {
    let gl = Graphics.gl
    let program = this.shader.program

    const bufferSize = 6

    let mat = mat4.create()
    mat4.ortho(mat, 0, Graphics.resolution.width, 
      Graphics.resolution.height, 0, -1, 1)
    mat4.translate(mat, mat, [x, y, 0])
    mat4.scale(mat, mat, [w, h, 1])

    gl.useProgram(program)
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'xform'), false, mat)

    let attr = gl.getAttribLocation(program, 'pos')
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.enableVertexAttribArray(attr)
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, bufferSize)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)

    // construct matrix 2x2

    // send translation

  }
}

export default RectV2