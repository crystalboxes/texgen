export class Displayable {
  params = {}
  viewSettings = {
    className: 'displayable-struct'
  }

  getClassName() {
    return this.viewSettings.className
  }
}
export default Displayable