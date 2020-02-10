import svgToImage from 'svg-to-image'
import Graphics from './Graphics.js'

class Image {
  constructor() {
    this.img = null
    this.texture = null
    this.width = 1
    this.height = 1
  }

  static fromSvg(svg, targetWidth) {
    let img = new Image

    let resize = targetWidth != null
    let width = 0
    let height = 0

    const defaultResolution = 1024
    targetWidth = targetWidth || defaultResolution

    // extract width and height from svg
    let parser = new DOMParser()
    let svgDoc = parser.parseFromString(svg, 'image/svg+xml')
    let root = svgDoc.getElementsByTagName('svg')[0]

    width = root.getAttribute('width')
    if (!width) {
      width = targetWidth
    }

    height = root.getAttribute('height')
    if (!height) {
      height = width
    }

    let viewBox = root.getAttribute('viewBox')
    if (viewBox) {
      let [l, t, w, h] = viewBox.split(' ')
      width = w || width
      height = h || height
    }
    let aspectRatio = width / height
    if (resize) {
      width = targetWidth
      height = targetWidth / aspectRatio
    }

    svgToImage(svg, function (err, image) {
      if (err) throw err

      image.width = width
      image.height = height

      img.img = image

      img.width = width
      img.height = height

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
    // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.texture = tex
  }

  draw(x, y, w, h) {
    Graphics.drawImage(this, x, y, w, h)
  }
}

export default Image
