import Stripe from '../core/Stripe.js'
import Greeble from './Greeble.js'

let st = Stripe

class Grids {
  static drawRegularGrid(params, app) {
    let p = params
    st.seedRandom(params.seed)

    let xCount = Math.floor(p.xCount * p.countScaler)
    let yCount =  Math.floor(p.yCount * p.countScaler)

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
