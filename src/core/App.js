import Graphics from "../gl/Graphics.js";

class App {
  rect = null;
  time = {
    previous: 0,
    current: 0,
    deltaTime: 0,
  };

  constructor(script, settings) {
    this.script = script;
    this.settings = settings;
    // since the DOM is generated on React's 'render' call constructor will do nothing
  }

  async onApplicationStart() {
    await Graphics.init(document.getElementById("app-display"));
    // initialize gl context here
    this.script.time = this.time;

    this.script.onStart();
    let that = this;
    function drawLoop() {
      // re-calculate the time
      let t = that.time;
      t.previous = t.current;
      t.current = new Date().getTime() / 1000;
      t.deltaTime = t.current - t.previous;

      that.script.onUpdate();
      requestAnimationFrame(drawLoop);
    }

    requestAnimationFrame(drawLoop);

    // start requestAnimationFrame loop
    // call the script
    // run all the callbacks and pipe them into loaded script
  }
}

export default App;
