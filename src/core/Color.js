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
    c.params = {
      r: { value: r | 0, rangeMin: 0, rangeMax: 255, step: 1 },
      g: { value: g | 0, rangeMin: 0, rangeMax: 255, step: 1 },
      b: { value: b | 0, rangeMin: 0, rangeMax: 255, step: 1 }
    }
    return c
  }

  static makeFloat(r, g, b, a) {
    let c = new Color
    c.isFloat = true
    c.params = { r: r, g: g, b: b, a: a }
    return c
  }

  display = ColorComponent

  get r() { return this.isFloat ? this.params.r : this.params.r.value * divisor }
  get g() { return this.isFloat ? this.params.g : this.params.g.value * divisor }
  get b() { return this.isFloat ? this.params.b : this.params.b.value * divisor }
  get a() { return this.isFloat ? this.params.a : 1.0 }

}
export default Color
