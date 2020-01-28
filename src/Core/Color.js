import { ColorComponent } from '../components/ColorComponent.jsx'
import {Displayable} from '../core/Displayable.js'

let divisor = 1 / 255.0
// range 0..255
export class Color extends Displayable {
  constructor(r, g, b) {
    super()
    this.params = {
      r: { value: r | 0, rangeMin: 0, rangeMax: 255 },
      g: { value: g | 0, rangeMin: 0, rangeMax: 255 },
      b: { value: b | 0, rangeMin: 0, rangeMax: 255 }
    }
  }
  display = ColorComponent

  get r() { return this.params.r.value * divisor }
  get g() { return this.params.g.value * divisor }
  get b() { return this.params.b.value * divisor }
  get a() { return 1.0 }
}
export default Color
// // range 0..1
// export class ColorRGBA extends Displayable {
//   constructor(r, g, b, a) {
//     super()
//     this.params = {r:r,g:g,b:b,a:a}
//   }
//   get r() { return this.params.r }
//   get g() { return this.params.g }
//   get b() { return this.params.b }
//   get a() { return this.params.a }

//   get rgba() {
//     return this
//   }
// }

// export default {Color, ColorRGBA}
