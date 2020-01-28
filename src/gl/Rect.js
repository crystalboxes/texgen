import Graphics from './Graphics.js'

class Rect {
  constructor() {
    let gl = Graphics.gl
    let shader = Graphics.createShader('rect.vert.glsl', 'rect.frag.glsl')
    let program = shader.program
    let posLoc = gl.getAttribLocation(program, "a_position")

    let buffer = gl.createBuffer()
    gl.useProgram(shader.program)
    gl.enableVertexAttribArray(posLoc)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.vertexAttribPointer(
      posLoc, 
      /* size = */ 2, 
      /* type = */ gl.FLOAT, 
      /* normalize = */ false, 
      /* stride = */ 0, 
      /* offset = */ 0
    )
    gl.useProgram(null)
    
    this.resLoc = gl.getUniformLocation(program, "u_resolution")
    this.colLoc = gl.getUniformLocation(program, "u_color")
    this.buffer = buffer
    this.shader = shader
  }

  draw(x, y, w, h, color) {
    let gl = Graphics.gl
    gl.useProgram(this.shader.program)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    let x1 = x;
    let x2 = x + w;
    let y1 = y;
    let y2 = y + h;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]), gl.STATIC_DRAW);
    gl.uniform2f(this.resLoc, Graphics.resolution.width, Graphics.resolution.height)
    gl.uniform4f(this.colLoc, color.r, color.g, color.b, color.a);
    gl.drawArrays(
      /* primitiveType = */ gl.TRIANGLES, 
      /* offset = */ 0,
      /* count = */ 6 
    )
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    gl.useProgram(null)
  }
}

export default Rect