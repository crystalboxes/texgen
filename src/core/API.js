import Graphics from '../gl/Graphics.js'
import Prando from 'prando'

const defaultSeed = 898
var rng = new Prando(defaultSeed)

class API {
  static Map(value, inputMin, inputMax, outputMin, outputMax) {
    return ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin)
  }

  static Lerp(a, b, t) {
    return a * (1 - t) + b * t
  }

  static Noise(x, y) {
    return Math.random()
  }

  static Color(r,g,b,a) {
    return Color.make(r,g,b,a) 
  }

  static Random(min, max) {
    return API.random(min, max)
  }
  static setColor = Graphics.setColor
  static drawRectangle = Graphics.drawRect
  static drawImage = Graphics.drawImage
  static drawCircle = Graphics.drawCircle
  static DrawCircle = Graphics.drawCircle
  static getWidth() { return Graphics.width }
  static getHeight() { return Graphics.height }
  static setCircleResolution(value) {
    Graphics.circleResolution = value
  }
  static SetCircleResolution(value) {
    Graphics.circleResolution = value
  }
  static random(min, max) {
    if (max == null) {
      max = min
      min = 0
    }
    return API.Map(Math.random(), 0, 1, min, max) //rng.next(min, max)
  }

  static seedRandom(seed) {
    if (seed < 1) {
      seed *= 1000
    }
    rng = new Prando(seed)
  }
}

export default API