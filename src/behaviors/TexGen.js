import Color from '../core/Color.js'
import Graphics from '../gl/Graphics.js'
import Framebuffer from '../gl/Framebuffer.js'
import Image from '../gl/Image.js'
import Script from '../core/Script.js'
import Displayable from '../core/Displayable.js'
import sampleImage from '../images/android.svg'
let gr = Graphics

export class ParamsBlock extends Displayable {
  _className = 'displayable-struct column'
  _v2 = true
}

export class GridEffect extends ParamsBlock {
  seed = 0
  xCount = 8
  yCount = 8
  countScaler = 1.0
  renderChance = 0.5
  spritePickChance = 0.5
  minDepth = 0.0
  maxDepth = 1.0
}

export class KdGridEffect extends ParamsBlock {
  optimize = false
  quadSplitFactor = 1.0
  seed = 0
  spriteChance = 0.5
  iterations = { value: 7, rangeMin: 1, rangeMax: 12, step: 1 }
  renderChance = 1.0
  kdSplitChance = 1.0
  splitChance = 1.0
  noiseGlobalOffset = 0
  noiseModulation = 1.0
  blackAndWhite = false
  bwBias = 0.5
  drawCircles = false
  drawCirclesBias = 0.5
  circleRadiusSize = 1.0
  minDepth = 0
  maxDepth = 1.0
}

export class RandomGridEffect extends ParamsBlock {
  seed = { value: 1000, rangeMin: 123, rangeMax: 9999 }
  greebleCount = { value: 100, rangeMin: 1, rangeMax: 10000 }
  spriteChance = 1.0
  minDepth = 0
  maxDepth = 1.0
  minSize = 20
  maxSize = 200
  minScaleX = 0.1
  minScaleY = 0.1
  maxScaleX = { value: 1.5, rangeMax: 10.0, step: 0.1 }
  maxScaleY = { value: 1.5, rangeMax: 10.0, step: 0.1 }
}

export class Colorizer extends Displayable {
  show = false
  a = Color.make(0, 0, 0)
  b = Color.make(255, 255, 255)
  c = Color.make(0, 0, 0)
  d = Color.make(255, 255, 255)
  _v2 = true
}

export class MainParams extends ParamsBlock {
  resolution = { value: 1024, rangeMin: 0, rangeMax: 2048 }
  colorize = new Colorizer
}

export class TexGen extends Script {
  main = new MainParams
  effects =  [new KdGridEffect, new RandomGridEffect, new GridEffect]

  svg = null
  fb = new Framebuffer
  onStart() {
    this.svg = Image.fromSvg(sampleImage, 256)
    this.fb.allocate(gr.width, gr.height)
    gr.circleResolution = 30
  }

  onUpdate() {
    let sin = Math.sin
    gr.clearColor('#333')
    this.fb.begin()

    

    gr.clearColor(this.main.colorize.a)
    let time = this.time.current
    for (let i = 0; i < 900; i++) {
      gr.setColor(
        127 + 127 * sin(i * 0.01 + time),
        127 + 127 * sin(i * 0.011 + time),
        127 + 127 * sin(i * 0.012 + time),
      )
      gr.drawCircle(gr.width * 0.5 + 100 * sin(i * 0.02 + time), 150 + i, 50 + 40 * sin(i * 0.005 + time))
    }

    // gr.setColor({ r: 1.0, g: 0, b: 0, a: 1 })
    // gr.drawRect(12, 20, 100, 100)

    // gr.setColor({ r: 0.0, g: 1, b: 0, a: 1 })
    // gr.circleResolution = 10
    // gr.drawCircle(300, 300, 100)

    // gr.setColor({ r: 0.0, g: 0.3, b: 0, a: 1 })
    // gr.circleResolution = 30
    // gr.drawCircle(400, 300, 100)

    // gr.drawImage(this.svg, 200, 300)
    this.fb.end()
    this.fb.draw(0, 0)
  }

  onDestroy() {
  }
  // callbacks
}
