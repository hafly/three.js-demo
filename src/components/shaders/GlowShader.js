// 边缘高亮
// 这个着色器是根据法向量来改变颜色强度的
const GlowShader = {
    uniforms: {},
    vertexShader: `
        uniform vec3 viewVector;
        uniform float constant;
        uniform float force;
        varying float intensity;
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            
            vec3 noraml1 = normalize(normalMatrix * normal);
            vec3 noraml2 = normalize(normalMatrix * cameraPosition);
            
            // 强度在顶点着色器计算。法向量和相机视图向量的点乘，0平行1垂直
            intensity = pow(constant - dot(noraml1, noraml2), force);
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main()
        {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4(glow, 1.0);
        }
    `
}

export {GlowShader};