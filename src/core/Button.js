import Displayable from "./Displayable";
import {ButtonComponent} from '../components/FieldRepresentation.jsx'
class Button extends Displayable {
  onClick = null
  __displayable = ButtonComponent
}

export default Button