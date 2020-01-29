precision mediump float;
varying vec2 uv;
uniform sampler2D texture;
void main(void) {
  gl_FragColor = texture2D(texture, vec2(uv.x, uv.y)).xyzw; 
}
