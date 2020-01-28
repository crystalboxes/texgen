export class Displayable {
  params = {}
  viewSettings = {
    className: 'displayable-struct'
  }

  get className() {
    return this.viewSettings.className
  }
}
export default Displayable