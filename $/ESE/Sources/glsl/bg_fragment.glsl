precision mediump float;

uniform sampler2D tex;

varying vec4 vColor;
varying vec2 vUV;

void main (void) {

    gl_FragColor = texture2D(tex, vUV);
    gl_FragColor.gb = vec2(gl_FragColor.r);

    gl_FragColor.a *= (gl_FragColor.r+gl_FragColor.g+gl_FragColor.b)/3.0;

    gl_FragColor *= vColor;

    gl_FragColor.rgb *= gl_FragColor.a;

}