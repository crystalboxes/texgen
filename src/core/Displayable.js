import {DisplayableComponent} from '../components/DisplayableComponent.jsx'

export class Displayable {
  get className() {
    return this._className
  }

  _displayable = DisplayableComponent
  _className = 'displayable-struct'
  _v2 = true

}
export default Displayable