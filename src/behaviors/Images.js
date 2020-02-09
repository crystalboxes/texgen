
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../images/sprites/', false, /\.(png|jpe?g|svg)$/));

class Images {
  static get sprites() {
    return images
  }
}

export default Images
