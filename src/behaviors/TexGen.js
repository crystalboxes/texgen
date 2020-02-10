import Color from '../core/Color.js'
import Framebuffer from '../gl/Framebuffer.js'
import Image from '../gl/Image.js'
import Script from '../core/Script.js'
import Displayable from '../core/Displayable.js'
import API from '../core/API.js'
import GUI from '../core/GUI.js'

let st = API
import Grids from './Grids.js'
import KdGrid from './KdGrid.js'
import Graphics from '../gl/Graphics.js'
import Label from '../core/Label.js'
import Button from '../core/Button.js'

import FileSaver from 'file-saver'
import Images from './Images.js'

export class ParamsBlock extends Displayable {
  __className = 'displayable-struct column'
  __collapsable = { collapsed: false }
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

  __displayTitle = 'Grid Effect'

}

export class KdGridEffect extends ParamsBlock {
  optimize = false
  quadSplitFactor = 1.0
  seed = 0
  spriteChance = 0.0
  iterations = { value: 5, rangeMin: 1, rangeMax: 12, step: 1 }
  splitRange = { value: 0.05, rangeMin: 0.04, rangeMax: 0.5 }
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

  __displayTitle = 'k-d Grid'

}

export class RandomGridEffect extends ParamsBlock {
  seed = { value: 1000, rangeMin: 123, rangeMax: 9999 }
  greebleCount = { value: 500, rangeMin: 1, rangeMax: 10000 }
  scaleCount = 1.0
  spriteChance = 0.5
  minDepth = 0
  maxDepth = 1.0
  minSize = 20
  maxSize = 200
  minScaleX = 0.1
  minScaleY = 0.1
  maxScaleX = { value: 1.5, rangeMax: 10.0, step: 0.1 }
  maxScaleY = { value: 1.5, rangeMax: 10.0, step: 0.1 }

  __displayTitle = 'Random Grid'

}

export class Colorizer extends Displayable {
  show = false
  a = Color.make(0, 0, 0)
  b = Color.make(255, 255, 255)
  c = Color.make(0, 0, 0)
  d = Color.make(255, 255, 255)

  __displayTitle = 'Colorizer'
  __collapsable = { collapsed: true }
}

export class Toggles extends ParamsBlock {
  kd = false
  randomGrid = true
  grid = false
  __collapsable = false
}

function getResolution(val) {
  return Math.pow(2, val);
}

function getResolutionLabel(val) {
  return "Resolution: " + getResolution(val)
}

export class MainParams extends ParamsBlock {
  resolutionLabel = new Label(getResolutionLabel(11))
  size = { value: 11, rangeMin: 1, rangeMax: 13, step: 1 }
  render = new Button
  toggles = new Toggles
  colorize = new Colorizer

  __collapsable = false
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
  constructor() {
    super()
    this.__canvasParameters.type = GUI.PanelType.Window
  }

  main = new MainParams
  effects = [new KdGridEffect, new RandomGridEffect, new GridEffect]

  svg = null
  fb = new Framebuffer

  __gui = {
    type: GUI.PanelType.Window,
    width: 156,
    height: 500,
    pos: { x: 10, y: 10 }
  }

  _needsToDraw = true

  get colorizer() {
    return this.main.colorize
  }

  get regularGridParams() {
    return this.effects[2]
  }

  get randomGridParams() {
    return this.effects[1]
  }

  get kdGridParams() {
    return this.effects[0]
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

  get res() {
    return getResolution(this.main.size.value)
  }

  render() {
    console.log('rendering')
    this.fb.dumpImage()
    FileSaver.saveAs(this.fb.img.src, 'img.png')
    
  }

  sprites = null

  onStart() {
    this.sprites = Images.sprites.map(x=>Image.fromSvg(x, 256))

    this.fb.allocate(this.res,this.res)
    st.SetCircleResolution(30)
    instance = this

    this.main.render.onClick = this.render.bind(this)
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
    Graphics.clearColor(255,255,255, 0)
    // st.SetColor(128)
    // st.DrawRectangle(0, 0, st.GetWidth(), st.GetHeight())
    if (this.main.toggles.grid) {
      Grids.drawRegularGrid(this.regularGridParams, this)
    }

    if (this.main.toggles.randomGrid) {
      Grids.drawRandomGrid(this.randomGridParams, this)
    }

    if (this.main.toggles.kd) {
      KdGrid.draw(this.kdGridParams, this)
    }

    this.fb.end()
    this.fb.draw(0, 0, Graphics.width, Graphics.height)
  }
  
  onValidate(val) {
    this._needsToDraw = true;
    let res = getResolution(this.main.size.value)
    if (res != this.fb.width) {
      this.fb.allocate(res, res)
    }
    this.main.resolutionLabel.text = getResolutionLabel(this.main.size.value)
  }

  onDestroy() {
  }

  onResize(width, height) {
    this._needsToDraw = true;
  }

}
