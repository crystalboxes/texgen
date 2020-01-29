import svgToImage from 'svg-to-image'
import Graphics from './Graphics'

class Image {
  constructor() {
    this.img = null
    this.texture = null
    this.width = 1
    this.height = 1
  }
  
  static fromSvg(svg) {
    let img = new Image
    svgToImage(svg, function (err, image) {
      if (err) throw err
      img.img = image
      img.updateResource()
    })
    return img
  }

  updateResource() {
    let gl = Graphics.gl

    let tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    this.width = this.img.width;
    this.height = this.img.height;

    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.img);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture = tex
  }

}

export default Image
