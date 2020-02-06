import API from '../../core/API.js'
import Greeble from './Greeble.js'

let st = API

var rgRand = API.MakeRandom()

function vec2(x, y) {
  return { x: x, y: y }
}

function getIrregular(minMaxDepth, minMaxSize, minScale, maxScale) {
  let g = new Greeble
  g.center.x = rgRand.range(0, st.GetWidth());
  g.center.y = rgRand.range(0, st.GetHeight());

  let size = rgRand.range(minMaxSize.x, minMaxSize.y) * 0.001;
  g.scale.x = rgRand.range(minScale.x, maxScale.x.value) * size;
  g.scale.y = rgRand.range(minScale.y, maxScale.y.value) * size;
  g.size = st.GetWidth();
  g.depth = rgRand.range(minMaxDepth.x, minMaxDepth.y);
  return g;
}

class Grids {
  static drawRandomGrid(p, app) {
    rgRand.init(p.seed);
    for (let x = 0; x < p.greebleCount.value * p.scaleCount; x++) {
      getIrregular(
        vec2(p.minDepth, p.maxDepth),
        vec2(p.minSize, p.maxSize), vec2(p.minScaleX, p.minScaleY),
        vec2(p.maxScaleX, p.maxScaleY)).draw(
          app.randomGridParams.spriteChance, app, function(x) {return rgRand.range(x)} )
    }
  }

  static drawRegularGrid(params, app) {
    let p = params
    st.SeedRandom(params.seed)

    let xCount = Math.floor(p.xCount * p.countScaler)
    let yCount = Math.floor(p.yCount * p.countScaler)

    let xIncr = st.GetWidth() / xCount
    let yIncr = st.GetHeight() / yCount

    let currentY = yIncr * 0.5

    for (let y = 0; y < yCount; y++) {
      let currentX = xIncr * 0.5;
      for (let x = 0; x < xCount; x++) {
        if (st.Random(1) < p.renderChance) {
          let g = new Greeble;
          g.center.x = currentX
          g.center.y = currentY
          g.scale.x = xIncr
          g.scale.y = yIncr
          g.size = 1
          g.depth = st.Random(p.minDepth, p.maxDepth)
          g.draw(app.regularGridParams.spritePickChance, app)
        }
        currentX += xIncr;
      }
      currentY += yIncr;
    }
  }
}

export default Grids
