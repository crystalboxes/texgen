import Color from '../core/Color.js'
import Graphics from '../gl/Graphics.js'
import Script from '../core/Script.js'
import Displayable from '../core/Displayable.js'
let gr = Graphics

export class ParamsBlock extends Displayable {
  viewSettings = {
    className: 'displayable-struct column'
  }
}

export class GridEffect extends ParamsBlock {
  params = {
    seed: 0,
    xCount: 8,
    yCount: 8,
    countScaler: 1.0,
    renderChance: 0.5,
    spritePickChance: 0.5,
    minDepth: 0.0,
    maxDepth: 1.0
  }
}

export class KdGridEffect extends ParamsBlock {
  params = {
    optimize: false,
    quadSplitFactor: 1.0,
    seed: 0,
    spriteChance: 0.5,
    iterations: { value: 7, rangeMin: 1, rangeMax: 12, step: 1 },
    renderChance: 1.0,
    kdSplitChance: 1.0,
    splitChance: 1.0,
    noiseGlobalOffset: 0,
    noiseModulation: 1.0,
    blackAndWhite: false,
    bwBias: 0.5,
    drawCircles: false,
    drawCirclesBias: 0.5,
    circleRadiusSize: 1.0,
    minDepth: 0,
    maxDepth: 1.0
  }
}

export class RandomGridEffect extends ParamsBlock {
  params = {
    seed: { value: 1000, rangeMin: 123, rangeMax: 9999 },
    greebleCount: { value: 100, rangeMin: 1, rangeMax: 10000 },
    spriteChance: 1.0,
    minDepth: 0,
    maxDepth: 1.0,
    minSize: 20,
    maxSize: 200,
    minScaleX: 0.1,
    minScaleY: 0.1,
    maxScaleX: { value: 1.5, rangeMax: 10.0, step: 0.1 },
    maxScaleY: { value: 1.5, rangeMax: 10.0, step: 0.1 },
  }
}

export class Colorizer extends Displayable {
  params = {
    show: false,
    a: Color.make(0, 0, 0),
    b: Color.make(255, 255, 255),
    c: Color.make(0, 0, 0),
    d: Color.make(255, 255, 255),
  }
}
export class MainParams extends ParamsBlock {
  params = {
    resolution: { value: 1024, rangeMin: 0, rangeMax: 2048 },
    colorize: new Colorizer,
  }
}

export class TexGen extends Script {
  params = {
    main: new MainParams,
    effects: [new KdGridEffect, new RandomGridEffect, new GridEffect]
  }

  onStart() {
  }

  onUpdate() {
    gr.clearColor({r:1, g:1, b:1, a:1})
    gr.setColor({ r: 1.0, g: 0, b: 0, a: 1 })
    gr.drawRect(10, 10, 100, 200)
  }

  onDestroy() {
  }
  // callbacks
}
