import Graphics from '../gl/Graphics.js'
import Prando from 'prando'

const defaultSeed = 898
let rng = new Prando(defaultSeed)

class Stripe {
  static setColor = Graphics.setColor
  static drawRectangle = Graphics.drawRect
  static drawImage = Graphics.drawImage
  static drawCircle = Graphics.drawCircle
  static getWidth() { return Graphics.width }
  static getHeight() { return Graphics.height }
  static setCircleResolution(value) {
    Graphics.circleResolution = value
  }
  static random(min, max) {
    if (!max) {
      max = min
      min = 0
    }
    return rng.next(min, max)
  }

  static seedRandom(seed) {
    rng = new Prando(seed * 10000)
  }
}

export default Stripe