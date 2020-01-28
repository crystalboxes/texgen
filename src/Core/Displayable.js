import {DisplayableComponent} from '../components/DisplayableComponent.jsx'

export class Displayable {
  params = {}
  viewSettings = {
    className: 'displayable-struct'
  }
  display = DisplayableComponent

  get className() {
    return this.viewSettings.className
  }
}
export default Displayable