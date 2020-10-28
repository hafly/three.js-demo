// 透明渐变
const GradientShader = {
    uniforms: {},
    vertexShader: `
        varying vec3 iPosition;
        void main(){
            iPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 iPosition;
        uniform float time;
        void main(){
            vec3 color = vec3(89./255.,208./255.,255./255.);
            float height = iPosition.y + 15.;
            float white = (distance(vec2(iPosition.x,iPosition.z),vec2(0.0))-6.0)/(6.0 * (sqrt(2.0)-1.0));
            float alphax = smoothstep(0.0,1.0,white );
            float alphay = smoothstep(1.0,0.0,height/25.0 + sin(time) * 0.2 );
            if(height<0.1||height>29.9){
                discard;
            }
            gl_FragColor = vec4(color +vec3(255.,0.,0.)* alphax * 0.0008,alphay*0.7);  
        }
    `
}

export {GradientShader};