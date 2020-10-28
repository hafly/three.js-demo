// 大气层效果
const AtmosphereShader = {
    uniforms: {
        'constant': {type: 'f', value: 0.8}
    },
    vertexShader: `
        varying vec3 vNormal;
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
         
            vNormal = normalize(normalMatrix * normal);
        }
    `,
    fragmentShader: `
        precision mediump float;
        uniform float constant;
        varying vec3 vNormal;
        void main() {
            // 强度在片元着色器计算。法向量和视图向量的点乘，0平行1垂直
            float intensity = pow(constant - dot(vNormal, vec3(0, 0, 1.0)), 10.0);
            gl_FragColor = vec4(1.0, 1.0, 1.0, intensity);
        }
    `
}

export {AtmosphereShader};