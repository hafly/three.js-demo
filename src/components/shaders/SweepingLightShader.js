// 扫光效果
const SweepingLightShader = {
    uniforms: {
        tDiffuse: {type: "t", value: null},
        time: {type: "f", value: -1.0}
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 iPosition;
        void main(){
            vUv = uv;
            iPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        varying vec3 iPosition;
        void main(){
            vec4 texel = texture2D(tDiffuse, vUv);
            float x = iPosition.x;
            float lighty = -x*1.2 + time;
            float alpha = abs(iPosition.y - lighty);
            if(alpha < 0.1){
                float a = 1.0 -  alpha / 0.1;
                float enda = smoothstep(0.0,1.0,a) + 1.0;
                gl_FragColor = texel * enda;
            }else{
                gl_FragColor = texel;
            }
        }
    `
}

export {SweepingLightShader};