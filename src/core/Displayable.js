import {DisplayableComponent} from '../components/DisplayableComponent.jsx'

export class Displayable {
  params = {}

  get className() {
    return this._className
  }

  _displayable = DisplayableComponent
  _className = 'displayable-struct'
}
export default Displayable