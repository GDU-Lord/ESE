precision mediump float;

uniform sampler2D tex;

varying vec4 vColor;
varying vec2 vUV;

void main (void) {

    gl_FragColor = texture2D(tex, vec2(vUV.y, 1.0-vUV.x))*vColor;

    gl_FragColor.rgb *= gl_FragColor.a;

    // if(gl_FragColor.a <= 0.0)
    //     gl_FragColor = vec4(1, 1, 1, 1);

}