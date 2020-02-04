import Stripe from '../core/Stripe.js'
import TexGen from './TexGen.js'

let st = Stripe
let app = TexGen.app

class Grids {
  static drawRegularGrid(params) {
    let p = params
    st.seedRandom(params.seed)

    let xCount =  p.xCount * p.countScaler
    let yCount =  p.yCount * p.countScaler

    let xIncr = getWidth() / xCount
    let yIncr = getHeight() / yCount

    let currentY = yIncr * 0.5

    for (let y = 0; y < yCount; y++) {
      let currentX = xIncr * 0.5;
      for (let x = 0; x < xCount; x++) {
        if (st.random(1) < p.renderChance) {
          let g;
          g.center.x = currentX
          g.center.y = currentY
          g.scale.x = xIncr
          g.scale.y = yIncr
          g.size = 1
          g.depth = st.random(p.minDepth, p.maxDepth)
          g.draw(app.regularGridParams.spritePickChance)
        }
        currentX += xIncr;
      }
      currentY += yIncr;
    }

  }
}

export default Grids