import Sprites from "./Sprites.js";
import API from "../core/API.js";
let st = API;
class Rect {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
}

function vec2(x, y) {
  return { x: x, y: y };
}

class Greeble {
  center = { x: 0, y: 0 };
  scale = { x: 1, y: 1 };
  size = 1;
  depth = 1;

  clone() {
    let g = new Greeble();
    g.center = { x: this.center.x, y: this.center.y };
    g.scale = { x: this.scale.x, y: this.scale.y };
    g.size = this.size;
    g.depth = this.depth;
    return g;
  }

  get() {
    let r = new Rect();
    r.w = this.size * this.scale.x;
    r.h = this.size * this.scale.y;
    r.x = this.center.x - r.w * 0.5;
    r.y = this.center.y - r.h * 0.5;
    return r;
  }

  doesClip() {
    let r = this.get();
    return r.x + r.w > st.GetWidth() || r.x < 0 || r.y + r.h > st.GetHeight() || r.y < 0;
  }

  static /* Greeble  */ fromRect(/* float */ x, /* float */ y, /* float */ w, /* float */ h, /* float */ depth) {
    let g = new Greeble();
    g.center = vec2(x + w / 2.0, y + h / 2.0);
    g.scale = vec2(w, h);
    g.size = 1.0;
    g.depth = depth;
    return g;
  }
  draw(spriteChance, app, randFunc) {
    if (randFunc == null) {
      randFunc = st.Random;
    }
    if (spriteChance == null) {
      spriteChance = 0.5;
    }
    let drawG = function (g) {
      st.SetColor(app.getColorFromIntensity(g.depth * 255));
      let r = g.get();
      if (spriteChance > randFunc(1.0)) {
        Sprites.drawRandom(r.x, r.y, r.w, r.h);
      } else {
        st.DrawRectangle(r.x, r.y, r.w, r.h);
      }
    };

    if (this.doesClip()) {
      let r = this.get();
      let g2 = this.clone();
      if (r.x + r.w > st.GetWidth()) {
        g2.center.x = g2.center.x - st.GetWidth();
      } else if (r.x < 0) {
        g2.center.x = g2.center.x + st.GetWidth();
      } else if (r.y + r.h > st.GetHeight()) {
        g2.center.y = g2.center.y - st.GetHeight();
      } else if (r.y < 0) {
        g2.center.y = g2.center.y + st.GetHeight();
      }
      drawG(g2);
    }
    drawG(this);
  }
}

export default Greeble;
