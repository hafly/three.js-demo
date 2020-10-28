import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import Stats from "three/examples/jsm/libs/stats.module";
import {GlowShader} from "../../components/shaders/GlowShader";

// Glow Shader
class Glow {
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
        this.initLight();
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
                    constant: {type: "f", value: 1.0},
                    force: {type: "f", value: 1.4},
                    glowColor: {type: "c", value: new THREE.Color(0xffff00)}
                },
                vertexShader: GlowShader.vertexShader,
                fragmentShader: GlowShader.fragmentShader,
                side: THREE.FrontSide,
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
            constant: 1.0,
            force: 1.4,
            bs: false,
            fs: true,
            nb: false,
            ab: true,
            color: "#ffff00"
        };

        let gui = new GUI({autoPlace: false});
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = 0;
        gui.domElement.style.right = 0;
        this.container.appendChild(gui.domElement);

        let top = gui.addFolder('Glow Shader Attributes');

        top.add(params, 'constant').min(0.0).max(1.0).step(0.01).name("constant").onChange(function (value) {
            self.sphereMesh.material.uniforms["constant"].value = value;
        });
        top.add(params, 'force').min(0.0).max(6.0).step(0.01).name("force").onChange(function (value) {
            self.sphereMesh.material.uniforms["force"].value = value
        });
        top.addColor(params, 'color').name('Glow Color').onChange(function (value) {
            self.sphereMesh.material.uniforms.glowColor.value.setHex(value.replace("#", "0x"));
        });
        top.open();

        // toggle front side / back side
        let folder1 = gui.addFolder('Render side');
        let fsGUI = folder1.add(params, 'fs').name("THREE.FrontSide").listen();
        fsGUI.onChange(function (value) {
            if (value) {
                bsGUI.setValue(false);
                self.sphereMesh.material.side = THREE.FrontSide;
            }
        });
        let bsGUI = folder1.add(params, 'bs').name("THREE.BackSide").listen();
        bsGUI.onChange(function (value) {
            if (value) {
                fsGUI.setValue(false);
                self.sphereMesh.material.side = THREE.BackSide;
            }
        });
        folder1.open();

        // toggle normal blending / additive blending
        let folder2 = gui.addFolder('Blending style');
        let nbGUI = folder2.add(params, 'nb').name("THREE.NormalBlending").listen();
        nbGUI.onChange(function (value) {
            if (value) {
                abGUI.setValue(false);
                self.sphereMesh.material.blending = THREE.NormalBlending;
            }
        });
        let abGUI = folder2.add(params, 'ab').name("THREE.AdditiveBlending").listen();
        abGUI.onChange(function (value) {
            if (value) {
                nbGUI.setValue(false);
                self.sphereMesh.material.blending = THREE.AdditiveBlending;
            }
        });
        folder2.open();
    }

    update() {
        requestAnimationFrame(this.update);
        this.renderer.render(this.scene, this.camera);

        this.controls.update();
        this.stats.update();
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

export {Glow};