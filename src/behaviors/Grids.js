import API from '../core/API.js'
import Greeble from './Greeble.js'

let st = API

function vec2(x, y) {
  return { x: x, y: y }
}

function getIrregular(minMaxDepth, minMaxSize, minScale, maxScale) {
  let g = new Greeble
  g.center.x = st.random(0, st.getWidth());
  g.center.y = st.random(0, st.getHeight());

  let size = st.random(minMaxSize.x, minMaxSize.y) * 0.001;
  g.scale.x = st.random(minScale.x, maxScale.x.value) * size;
  g.scale.y = st.random(minScale.y, maxScale.y.value) * size;
  g.size = st.getWidth();
  g.depth = st.random(minMaxDepth.x, minMaxDepth.y);
  return g;
}

class Grids {
  static drawRandomGrid(p, app) {
    st.seedRandom(p.seed);
    for (let x = 0; x < p.greebleCount.value * p.scaleCount; x++) {
      getIrregular(
        vec2(p.minDepth, p.maxDepth),
        vec2(p.minSize, p.maxSize), vec2(p.minScaleX, p.minScaleY),
        vec2(p.maxScaleX, p.maxScaleY)).draw(
          app.randomGridParams.spriteChance, app)
    }
  }

  static drawRegularGrid(params, app) {
    let p = params
    st.seedRandom(params.seed)

    let xCount = Math.floor(p.xCount * p.countScaler)
    let yCount = Math.floor(p.yCount * p.countScaler)

    let xIncr = st.getWidth() / xCount
    let yIncr = st.getHeight() / yCount

    let currentY = yIncr * 0.5

    for (let y = 0; y < yCount; y++) {
      let currentX = xIncr * 0.5;
      for (let x = 0; x < xCount; x++) {
        if (st.random(1) < p.renderChance) {
          let g = new Greeble;
          g.center.x = currentX
          g.center.y = currentY
          g.scale.x = xIncr
          g.scale.y = yIncr
          g.size = 1
          g.depth = st.random(p.minDepth, p.maxDepth)
          g.draw(app.regularGridParams.spritePickChance, app)
        }
        currentX += xIncr;
      }
      currentY += yIncr;
    }
  }
}

export default Grids
