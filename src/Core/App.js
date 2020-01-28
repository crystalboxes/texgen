class App {
  canvas = null
  constructor(script) {
    this.script = script
    // since the DOM is generated on React's 'render' call constructor will do nothing
  }
  onApplicationStart() {
    this.canvas = document.getElementById('app-display')
    // initialize gl context here

    // start requestAnimationFrame loop

    // call the script

    // run all the callbacks and pipe them into loaded script
  }
}

export default App
