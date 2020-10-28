import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import Stats from "three/examples/jsm/libs/stats.module";
import {GradientShader} from "../../components/shaders/GradientShader";

// Gradient Shader
class Gradient {
    constructor(container) {
        this.container = container;
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.controls = undefined;
        this.stats = undefined;

        this.update = this.update.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);

        this.init();
        this.update();
    }

    init() {
        this.initScene();
        this.initCamera();
        // this.initLight();
        this.initModel();
        this.initRenderer();
        this.initGUI();

        this.bindEvent();
    }

    initScene() {
        this.scene = new THREE.Scene();

        this.stats = new Stats();
        this.container.appendChild(this.stats.dom);
    }

    initCamera() {
        this.camera = new THREE.PerspectiveCamera(30, this.container.clientWidth / this.container.clientHeight, 1, 10000);
        this.camera.position.set(0, 400, 800);
        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.camera);
    }

    initLight() {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    initModel() {
        let material = new THREE.ShaderMaterial(
            {
                uniforms: {
                    iColor: {type: 'vec3', value: new THREE.Color('#ffffff')},
                    iHeight: {type: 'f', value: 50.0},
                    time: {type: 'f', value: 0.0}
                },
                vertexShader: GradientShader.vertexShader,
                fragmentShader: GradientShader.fragmentShader,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            });

        let sphereGeo = new THREE.SphereGeometry(100, 32, 32);
        this.sphereMesh = new THREE.Mesh(sphereGeo, material);
        this.sphereMesh.position.set(-150, 0, 0);
        this.scene.add(this.sphereMesh);

        let cubeGeo = new THREE.CubeGeometry(150, 150, 150, 2, 2, 2);
        this.cubeMesh = new THREE.Mesh(cubeGeo, material);
        this.cubeMesh.position.set(150, 0, 0);
        this.scene.add(this.cubeMesh);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    initGUI() {
        let self = this;
        let params = {
            iHeight: 50.0,
            iColor: "#ffffff"
        };

        let gui = new GUI({autoPlace: false});
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = 0;
        gui.domElement.style.right = 0;
        this.container.appendChild(gui.domElement);

        let top = gui.addFolder('Glow Shader Attributes');

        top.add(params, 'iHeight').min(1).max(100).step(1).name("height").onChange(function (value) {
            self.sphereMesh.material.uniforms["iHeight"].value = value;
        });
        top.addColor(params, 'iColor').name('color').onChange(function (value) {
            self.sphereMesh.material.uniforms['iColor'].value.setHex(value.replace("#", "0x"));
        });
        top.open();
    }

    update() {
        requestAnimationFrame(this.update);
        this.renderer.render(this.scene, this.camera);

        this.controls.update();
        this.stats.update();

        this.cubeMesh.material.uniforms.time.value += 0.1;
    }

    onWindowResize() {
        let w = this.container.clientWidth;
        let h = this.container.clientHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(w, h);
    }

    bindEvent() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        window.addEventListener('resize', this.onWindowResize, false);
    }
}

export {Gradient};