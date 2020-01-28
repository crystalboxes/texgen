import { ColorComponent } from '../Components/ColorComponent.jsx'
import {Displayable} from '../Core/Displayable.js'

export class Color extends Displayable {
  constructor(r, g, b) {
    super()
    this.params = {
      r: { value: r, rangeMin: 0, rangeMax: 255 },
      b: { value: g, rangeMin: 0, rangeMax: 255 },
      a: { value: b, rangeMin: 0, rangeMax: 255 }
    }
  }
  display = ColorComponent
}
export default Color
