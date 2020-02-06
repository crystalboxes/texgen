import Graphics from '../gl/Graphics.js'
import seedrandom from 'seedrandom'
import SimplexNoise from 'simplex-noise'
import Color from '../core/Color.js'
import Random from './Random.js'

let lastSeed = 898
var rand = seedrandom(lastSeed)
var simplex = new SimplexNoise('noise')

class API {
  static Map(value, inputMin, inputMax, outputMin, outputMax) {
    return ((value - inputMin) / (inputMax - inputMin) * (outputMax - outputMin) + outputMin)
  }

  static Lerp(a, b, t) {
    return a * (1 - t) + b * t
  }

  static Noise(x, y) {
    if (y == null) {
      y = 213
    }
    return API.Map(simplex.noise2D(x, y), -1, 1, 0, 1)
  }

  static Color(r, g, b, a) {
    return Color.make(r, g, b, a)
  }

  static Random(min, max) {
    if (max == null) {
      max = min
      min = 0
    }
    return API.Map(rand(), 0, 1, min, max) // /* API.Map(Math.random(), 0, 1, min, max) // */rand.floatBetween(min, max)
  }

  static MakeRandom(seed, numbersToStore) {
    return new Random(seed, numbersToStore)
  }

  static ClearColor = Graphics.clearColor

  static DrawRectangle = Graphics.drawRect
  static SetColor = Graphics.setColor
  static DrawImage = Graphics.drawImage
  static DrawCircle = Graphics.drawCircle
  static DrawCircle = Graphics.drawCircle
  static GetWidth() { return Graphics.width }
  static GetHeight() { return Graphics.height }
  static SetCircleResolution(value) {
    Graphics.circleResolution = value
  }

  static SeedRandom(seed) {
    lastSeed = seed
    if (seed < 1) {
      seed = Math.floor(seed * 1000)
    }
    rand = seedrandom(seed)
  }
}

export default API
