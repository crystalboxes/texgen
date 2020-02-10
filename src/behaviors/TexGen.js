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
  zPriority = 2
  seed = 0
  xCount = 8
  yCount = 8
  countScaler = 1.0
  renderChance = 1.0
  spritePickChance = 0.0
  minDepth = 0.0
  maxDepth = 1.0

  __paramsConfig = {
    zPriority: { rangeMin: 0, rangeMax: 5, step: 1 }
  }

  __displayTitle = 'Grid Effect'
}

export class KdGridEffect extends ParamsBlock {
  zPriority = 0
  optimize = false
  quadSplitFactor = 1.0
  seed = 0
  spriteChance = 0.0
  iterations = 5
  splitRange = 0.05
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
  __paramsConfig = {
    zPriority: { rangeMin: 0, rangeMax: 5, step: 1 },
    iterations: { rangeMin: 1, rangeMax: 12, step: 1 },
    splitRange: { rangeMin: 0.04, rangeMax: 0.5 }
  }
}

export class RandomGridEffect extends ParamsBlock {
  zPriority = 1
  seed = 1000
  greebleCount = 500
  scaleCount = 1.0
  spriteChance = 0.5
  minDepth = 0
  maxDepth = 1.0
  minSize = 20
  maxSize = 200
  minScaleX = 0.1
  minScaleY = 0.1
  maxScaleX = 1.5
  maxScaleY = 1.5

  __displayTitle = 'Random Grid'
  __paramsConfig = {
    zPriority: { rangeMin: 0, rangeMax: 5, step: 1 },
    maxScaleX: { rangeMax: 10.0, step: 0.1 },
    maxScaleY: { rangeMax: 10.0, step: 0.1 },
    seed: { rangeMin: 123, rangeMax: 9999 },
    greebleCount: { rangeMin: 1, rangeMax: 10000 }
  }
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
  size = 11
  render = new Button
  toggles = new Toggles
  colorize = new Colorizer

  __collapsable = false
  __paramsConfig = {
    size: { rangeMin: 1, rangeMax: 13, step: 1 }
  }
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

  needsToDraw = true
  sprites = null
  __includeParams = ['main', 'effects']

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
    return getResolution(this.main.size)
  }

  render() {
    console.log('rendering')
    this.fb.dumpImage()
    FileSaver.saveAs(this.fb.img.src, 'img.png')

  }


  onStart() {
    this.sprites = Images.sprites.map(x => Image.fromSvg(x, 256))

    this.fb.allocate(this.res, this.res)
    st.SetCircleResolution(30)
    instance = this

    this.main.render.onClick = this.render.bind(this)
    let that = this
    this.effectCallbacks = [
      {
        effectParameters: this.regularGridParams, executionFunction: function () {
          if (that.main.toggles.grid) {
            Grids.drawRegularGrid(that.regularGridParams, that)
          }
        }
      },
      {
        effectParameters: this.randomGridParams, executionFunction: function () {
          if (that.main.toggles.randomGrid) {
            Grids.drawRandomGrid(that.randomGridParams, that)
          }
        }
      },
      {
        effectParameters: this.kdGridParams, executionFunction: function () {
          if (that.main.toggles.kd) {
            KdGrid.draw(that.kdGridParams, that)
          }
        }
      }
    ]
  }

  static get app() {
    return instance
  }

  onUpdate() {
    if (!this.needsToDraw) {
      return
    }
    this.needsToDraw = false

    this.fb.begin()
    Graphics.clearColor(255, 255, 255, 0)
    this.effectCallbacks.sort((a,b) => b.effectParameters.zPriority - a.effectParameters.zPriority)
    for(let effect of this.effectCallbacks) {
      effect.executionFunction()
    }

    this.fb.end()
    this.fb.draw(0, 0, Graphics.width, Graphics.height)
  }

  onValidate(val) {
    this.needsToDraw = true;
    let res = getResolution(this.main.size)
    if (res != this.fb.width) {
      this.fb.allocate(res, res)
    }
    this.main.resolutionLabel.text = getResolutionLabel(this.main.size)
  }

  onDestroy() {
  }

  onResize(width, height) {
    this.needsToDraw = true;
  }

}
