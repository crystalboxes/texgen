import { ColorComponent } from '../components/ColorComponent.jsx'
import { Displayable } from '../core/Displayable.js'
import parse from 'color-parse'

const divisor = 1 / 255.0
// range 0..255
export class Color extends Displayable {
  isFloat = false

  static validate(o) {
    if (!o) {
      return null
    }
    if (Array.isArray(o) && o.length === 1) {
      o = o[0]
    }
    let objectType = typeof o
    if (objectType === 'string') {
      return Color.parse(o)
    } else if (objectType === 'object' && !Array.isArray(o)) {
      if ('r' in o && 'g' in o && 'b' in o && 'a' in o) {
        return o
      }
    }
    else if (objectType === 'number') {
      return Color.make(o * 255, o * 255, o * 255)
    } else if (Array.isArray(o)) {
      if (o.length == 4) {
        return Color.makeFloat(o[0], o[1], o[2], o[3])
      } else if (o.length == 3) {
        return Color.make(o[0], o[1], o[2])
      }
    }
    return null
  }

  static parse(str) {
    let parsed = parse(str)
    if (parsed.space === 'rgb') {
      return Color.make(
        parsed.values[0], parsed.values[0], parsed.values[0]
      )
    } else {
      return Color.makeFloat(
        parsed.values[0], parsed.values[0], parsed.values[0], parsed.alpha
      )
    }
  }

  static make(r, g, b) {
    let c = new Color
    c.red = { value: r | 0, rangeMin: 0, rangeMax: 255, step: 1 }
    c.green = { value: g | 0, rangeMin: 0, rangeMax: 255, step: 1 }
    c.blue = { value: b | 0, rangeMin: 0, rangeMax: 255, step: 1 }
    return c
  }

  static makeFloat(r, g, b, a) {
    let c = new Color
    c.isFloat = true
    c.red = r
    c.blue = g
    c.green = b
    c.alpha = a
    return c
  }


  get r() { return this.isFloat ? this.red : this.red.value * divisor }
  get g() { return this.isFloat ? this.green : this.green.value * divisor }
  get b() { return this.isFloat ? this.blue : this.blue.value * divisor }
  get a() { return this.isFloat ? this.alpha : 1.0 }

  _v2 = true
  _displayable = ColorComponent
  _params = ['red', 'green', 'blue', 'alpha']
}

export default Color
