import { ColorComponent } from '../components/ColorComponent.jsx'
import { Displayable } from '../core/Displayable.js'

const divisor = 1 / 255.0
// range 0..255
export class Color extends Displayable {
  isFloat = false
  static make(r, g, b) {
    let c = new Color
    c.params = {
      r: { value: r | 0, rangeMin: 0, rangeMax: 255, step: 1},
      g: { value: g | 0, rangeMin: 0, rangeMax: 255, step: 1},
      b: { value: b | 0, rangeMin: 0, rangeMax: 255, step: 1}
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
