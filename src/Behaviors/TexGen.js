class Displayable {
  params = {}
}

export class TexGen extends Displayable {
  params = {
    resolution: { value: 1024, rangeMin: 0, rangeMax: 2048 },
    colorize: false,
    effects: []
  }

  onStart() {
  }

  onUpdate() {
  }

  onDestroy() {
  }
  // callbacks
}
