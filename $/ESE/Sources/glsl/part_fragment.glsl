precision mediump float;

uniform sampler2D tex;

varying vec4 vColor;
varying vec2 vUV;

void main (void) {

    gl_FragColor = texture2D(tex, vUV)*vColor;
    gl_FragColor.a *= 1.0-length(vUV-vec2(0.5, 0.5))*2.0;

    gl_FragColor.rgb *= gl_FragColor.a;

}