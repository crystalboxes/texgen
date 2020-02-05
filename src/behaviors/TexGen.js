import Color from '../core/Color.js'
// import Graphics from '../gl/Graphics.js'
import Framebuffer from '../gl/Framebuffer.js'
import Image from '../gl/Image.js'
import Script from '../core/Script.js'
import Displayable from '../core/Displayable.js'
import sampleImage from '../images/android.svg'
// let gr = Graphics
import Stripe from '../core/Stripe.js'
let st = Stripe
import Grids from '../behaviors/Grids.js'

export class ParamsBlock extends Displayable {
  _className = 'displayable-struct column'
}

export class GridEffect extends ParamsBlock {
  seed = 0
  xCount = 8
  yCount = 8
  countScaler = 1.0
  renderChance = 1.0
  spritePickChance = 0.0
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
}

export class MainParams extends ParamsBlock {
  resolution = { value: 1024, rangeMin: 0, rangeMax: 2048 }
  colorize = new Colorizer
}

let instance = null

function v3(c) {
	return {
		x: c.r / 255.0,
		y: c.g / 255.0,
		z: c.b / 255.0
  }
}

export class TexGen extends Script {
  main = new MainParams
  effects =  [new KdGridEffect, new RandomGridEffect, new GridEffect]

  svg = null
  fb = new Framebuffer

  _needsToDraw = true

  get colorizer() {
    return this.main.colorize
  }

  get regularGridParams() {
    return this.effects[2]
  }

  getColorFromIntensity(brightness) {
    if (!this.main.colorize.show) {
      return Color.make(brightness)
    }
    let t = brightness / 255.0;
    let a = v3(this.colorizer.a);
    let b = v3(this.colorizer.b);
    let c = v3(this.colorizer.c);
    let d = v3(this.colorizer.d);
  
    let o = {
      x: a.x + b.x * Math.cos(6.28318 * (c.x * t + d.x)),
      y: a.y + b.y * Math.cos(6.28318 * (c.y * t + d.y)),
      z: a.z + b.z * Math.cos(6.28318 * (c.z * t + d.z))
    }
    return Color.make(o.x * 255, o.y * 255, o.z * 255);
  }

  onStart() {
    this.svg = Image.fromSvg(sampleImage, 256)
    this.fb.allocate(st.getWidth(), st.getHeight())
    st.setCircleResolution(30)
    instance = this
  }

  static get app() {
    return instance
  }

  onUpdate() {
    if (!this._needsToDraw) {
      return
    } 
    this._needsToDraw = false

    this.fb.begin()
    st.setColor(128)
    st.drawRectangle(0, 0, st.getWidth(), st.getHeight())
    if (true) {
      Grids.drawRegularGrid(this.regularGridParams, this)
    }

    this.fb.end()
    this.fb.draw(0, 0)
  }
  
  onValidate(val) {
    this._needsToDraw = true;
  }

  onDestroy() {
  }
}
