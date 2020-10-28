import * as THREE from "three";
// 透明渐变
const GradientShader = {
    uniforms: {
        'iHeight': {type: 'f', value: 20.0},
        'iColor': {type: 'c', value: new THREE.Color(0xffffff)}
    },
    vertexShader: `
        varying vec3 iPosition;
        void main(){
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            
            iPosition = position;
        }
    `,
    fragmentShader: `
        precision mediump float;
        varying vec3 iPosition;
        uniform vec3 iColor;
        uniform float iHeight;
        uniform float time;
        void main(){
            vec3 color = vec3(iColor);
            float height = iPosition.y + iHeight/2.0;
            float white = distance(vec2(iPosition.x,iPosition.z),vec2(0.0));
            float alphax = smoothstep(0.0,1.0,white);
            float alphay = smoothstep(1.0,0.0,height/iHeight + sin(time) * 0.2 );
            if(height<0.1||height>iHeight){
                discard;
            }
            gl_FragColor = vec4(color +vec3(255.,0.,0.)* alphax * 0.0008,alphay*0.7);  
        }
    `
}

export {GradientShader};