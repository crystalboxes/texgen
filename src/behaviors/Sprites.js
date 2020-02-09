import {TexGen} from './TexGen.js'

class Sprites {
  static drawRandom(x, y, w, h, rand01) {
    let len = TexGen.app.sprites.length
    let idx = Math.floor(rand01(len))
    TexGen.app.sprites[idx].draw(x, y, w, h)
  }
}

export default Sprites
