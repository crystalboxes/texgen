import API from '../core/API.js'
import Greeble from './Greeble.js'

let st = API
var app = null
let noiseOffset = 0

function validRect(r) {
  if (!app.kdGridParams.optimize) {
    return true;
  }

  if (r.w < 0.01 || r.h < 0.01) {
    return false;
  }
  return true;
}
function clone(r) {
  return { x: r.x, y: r.y, w: r.w, h: r.h }
}
function splitRect(r, seed) {
  let quadSplitFactor = app.kdGridParams.quadSplitFactor;

  if (st.Random(1.0) > app.kdGridParams.kdSplitChance) {
    quadSplitFactor = 0.0;
  }

  let rnd2 = function (a0, b0, off) {
    let m = (b0 - a0) * app.kdGridParams.splitRange.value;
    a0 += m;
    b0 -= m;

    return st.Map(st.Lerp(st.Random(1.0), st.Noise(
      noiseOffset + off + app.kdGridParams.noiseGlobalOffset),
      app.kdGridParams.noiseModulation),
      0.0, 1.0, a0, b0);
  }

  let a = clone(r), b = clone(r), c = clone(r), d = clone(r)

  let split_h = rnd2(r.x, r.x + r.w, seed + 20)
  let split_v = rnd2(r.y, r.y + r.h, seed + 223)
  if (st.Random(1.0) > 0.5) {
    split_v = st.Lerp(r.y, split_v, quadSplitFactor)
  }
  else {
    split_h = st.Lerp(r.x, split_h, quadSplitFactor)
  }

  let len = split_h - r.x
  b.x = split_h
  a.w = len
  b.w -= len

  c = clone(a)
  d = clone(b)

  {
    let len2 = split_v - r.y;
    a.h = len2;
    b.h = len2;

    c.y = split_v;
    d.y = split_v;

    c.h -= len2;
    d.h -= len2;
  }

  return { a: a, b: b, c: c, d: d }
}

function split(rects, seed) {
  let out = []
  let iter = seed;

  for (let r of rects) {
    if (st.Random(1.0) > app.kdGridParams.splitChance) {
      out.push(r);
      continue
    }

    let ab = splitRect(clone(r), iter++)
    if (validRect(ab.a)) {
      out.push(ab.a)
    }

    if (validRect(ab.b)) {
      out.push(ab.b)
    }

    if (validRect(ab.c)) {
      out.push(ab.c)
    }

    if (validRect(ab.d)) {
      out.push(ab.d)
    }
  }
  return out;
}
let kd = {
  validRect: validRect,
  clone: clone,
  splitRect: splitRect,
  split: split,
}

class KdGrid {
  static draw(params, a) {
    app = a
    st.seedRandom(params.seed)
    let rects = [{ x: 0, y: 0, w: st.getWidth(), h: st.getHeight() },]

    // use first and second
    for (let x = 0; x < app.kdGridParams.iterations.value; x++) {
      rects = kd.split(rects, x);
    }

    let total_rects = 0;
    st.SetCircleResolution(100);

    for (let r of rects) {
      if (st.Random(1.0) > app.kdGridParams.render_chance) {
        continue;
      }
      if (!kd.validRect(r)) {
        continue;
      }

      let randomValue = st.Random(app.kdGridParams.minDepth, app.kdGridParams.maxDepth);
      let isBlack = app.kdGridParams.bwBias > randomValue;

      let colorIntensity = (app.kdGridParams.bw ? (isBlack ? 0 : 1) : randomValue);

      Greeble.fromRect(r.x, r.y, r.w, r.h, colorIntensity).draw(
        app.kdGridParams.bw ? 0.0 : app.kdGridParams.spriteChance, app
      )

      if (app.kdGridParams.bw && app.kdGridParams.drawCircles) {
        console.log(app)
        let altColor = st.Color(
          app.getColorFromIntensity(0));
        if (isBlack) {
          console.log(app)
          altColor = app.getColorFromIntensity(255)
        }

        if (ofRandom(1.0) < app.kdGridParams.drawCirclesBias) {
          st.SetColor(altColor);
          let radius = 0.5 * (r.w > r.h ? r.h : r.w) * app.kdGridParams.circleRadiusSize;
          st.DrawCircle(r.w * 0.5 + r.x, r.h * 0.5 + r.y, radius);
        }
      }
      total_rects++;
    }
  }
}
export default KdGrid