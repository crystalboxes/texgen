import Graphics from './Graphics.js'
import Image from './Image.js'

class Framebuffer extends Image {
  constructor() {
    super()
    this.fb = null
  }

  allocate(width, height) {
    this.width = width
    this.height = height

    let gl = Graphics.gl
    // create to render to
    const targetTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, targetTexture);
    {
      const level = 0;
      const internalFormat = gl.RGBA;
      const border = 0;
      const format = gl.RGBA;
      const type = gl.UNSIGNED_BYTE;
      const data = null;
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
        width, height, border, format, type, data);

      // set the filtering so we don't need mips
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    this.fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, targetTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    this.texture = targetTexture
  }

  begin() {
    
    let gl = Graphics.gl
    Graphics.currentFbo = this
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
    Graphics.setViewport(0, 0, this.width, this.height)
  }

  end() {
    let gl = Graphics.gl
    Graphics.currentFbo = null
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    Graphics.setViewport()
  }
}

export default Framebuffer
