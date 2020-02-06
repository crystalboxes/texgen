import Script from '../core/Script.js'
import API from '../core/API.js'

export class MyApp extends Script {
  drawRect = true

  onStart() {
  }

  onUpdate() {
    API.ClearColor(0)
    if (this.drawRect) {
      API.SetColor(90, 30, 30)
      API.DrawCircle(API.GetWidth() / 2, API.GetHeight() / 2, 100)
    }
  }

  onValidate(val) {
  }

  onDestroy() {
  }
}
