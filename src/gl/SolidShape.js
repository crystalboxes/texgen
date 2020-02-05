import Graphics from './Graphics.js'
import { mat4 } from 'gl-matrix'

const defaultCircleResolution = 20

class SolidShape {
  shapeType = {
    rect: 0,
    circle: 1
  }

  shapes = {
    rect: { size: 0, buffer: null },
    circle: { size: 0, buffer: null, resolution: defaultCircleResolution }
  }

  SetCircleResolution(value) {
    this.shapes.circle.resolution = value > 0 ? value : defaultCircleResolution
    this.updateCircle()
  }

  init() {
    let gl = Graphics.gl
    this.solidShader = Graphics.createShader(
      'solid.vert.glsl', 'solid.frag.glsl')
    this.imageShader = Graphics.createShader(
      'image.vert.glsl', 'image.frag.glsl')
    this.imageFlipUv = Graphics.createShader(
      'image-uvflip.vert.glsl', 'image.frag.glsl')

    let program = this.solidShader.program
    let makeBufferWithData = function (data) {
      let buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
      return buffer
    }
    gl.useProgram(program)
    this.shapes.rect = {
      size: 6,
      buffer: makeBufferWithData([
        0, 0, 0, 1, 1, 0,
        1, 0, 0, 1, 1, 1,
      ]),
    }

    this.updateCircle()
    gl.useProgram(null)
  }

  updateCircle() {
    let gl = Graphics.gl
    let circle = this.shapes.circle
    // make vertices from resolution
    let verts = []
    circle.size = 0;
    let angle = 0
    let step = 2 * Math.PI / circle.resolution
    while (angle < 2 * Math.PI) {
      verts.push(Math.sin(angle), Math.cos(angle))
      angle += step
      verts.push(Math.sin(angle), Math.cos(angle))
        verts.push(0, 0) 
      circle.size += 3
    }

    if (!circle.buffer) {
      circle.buffer = gl.createBuffer()
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, circle.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  // it should draw the uv quad
  draw(shape, x, y, w, h, color) {
    let mat = mat4.create()
    mat4.ortho(mat, 0, Graphics.resolution.width,
      Graphics.resolution.height, 0, -1, 1)
    mat4.translate(mat, mat, [x, y, 0])
    mat4.scale(mat, mat, [w, h, 1])

    let isImage = typeof shape === 'object' && 'width' in shape && 'height' in shape

    let gl = Graphics.gl
    let program = null
    if (isImage) {
      // this is an fbo
      if ('fb' in shape) {
        program = this.imageFlipUv.program
      } else {
        program = this.imageShader.program
      }
    } else {
      program = this.solidShader.program
    }

    gl.useProgram(program)
    gl.uniformMatrix4fv(gl.getUniformLocation(program, 'xform'), false, mat)
    if (isImage) {
      gl.bindTexture(gl.TEXTURE_2D, shape.texture);
      gl.uniform1i(gl.getUniformLocation(program, 'texture'), 0);
    } else {
      gl.uniform4f(gl.getUniformLocation(program, 'color'), color.r, color.g, color.b, color.a)
    }

    let shapeData = this.shapes.rect
    if (!isImage && this.shapeType.circle == shape) {
      // bind texture
      shapeData = this.shapes.circle
    }
    
    let attr = gl.getAttribLocation(program, 'pos')
    gl.bindBuffer(gl.ARRAY_BUFFER, shapeData.buffer)
    gl.enableVertexAttribArray(attr)
    gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, shapeData.size)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    if (isImage) {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    gl.useProgram(null)
  }
}

export default SolidShape
