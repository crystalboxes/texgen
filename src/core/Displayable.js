import {DisplayableComponent} from '../components/DisplayableComponent.jsx'

export class Displayable {
  get className() {
    return this.__className
  }

  __displayable = DisplayableComponent
  __collapsable = false
  __className = 'displayable-struct'
  __displayTitle = ''
  __paramsConfig = {}
}
export default Displayable