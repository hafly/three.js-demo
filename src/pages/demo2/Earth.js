import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import Stats from "three/examples/jsm/libs/stats.module";
import {EarthShader} from "../../components/shaders/EarthShader";
import {AtmosphereShader} from "../../components/shaders/AtmosphereShader";

// Eath Shader And Atmoshphere Sahder
class Earth {
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
        this.camera.position.set(0, 280, 350);
        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.camera);
    }

    initLight() {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    initModel() {
        let textureLoader = new THREE.TextureLoader();

        let earthUniforms = THREE.UniformsUtils.clone(EarthShader.uniforms)
        let texture = textureLoader.load(require('./textures/world.png'));
        earthUniforms['texture'].value = texture;

        let earthMaterial = new THREE.ShaderMaterial({
            uniforms: earthUniforms,
            vertexShader: EarthShader.vertexShader,
            fragmentShader: EarthShader.fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        let earthGeometry = new THREE.SphereGeometry(100, 32, 32);
        earthGeometry.rotateY(THREE.Math.degToRad(-90));

        this.earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        this.scene.add(this.earthMesh);

        // 光环
        let atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(AtmosphereShader.uniforms),
            vertexShader: AtmosphereShader.vertexShader,
            fragmentShader: AtmosphereShader.fragmentShader,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });

        this.atmosphereMesh = new THREE.Mesh(earthGeometry, atmosphereMaterial);
        this.atmosphereMesh.scale.set(1.1, 1.1, 1.1);
        this.scene.add(this.atmosphereMesh);
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
            earth: true,
            atmosphere: true,
            constant: 0.8
        };

        let gui = new GUI({autoPlace: false});
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = 0;
        gui.domElement.style.right = 0;
        this.container.appendChild(gui.domElement);

        gui.add(params, 'earth').name("earth visible").onChange(function (value) {
            self.earthMesh.visible = value;
        });
        gui.add(params, 'atmosphere').name("atmosphere visible").onChange(function (value) {
            self.atmosphereMesh.visible = value;
        });

        gui.add(params, 'constant').name("constant").min(0.0).max(1.0).step(0.01).onChange(function (value) {
            self.atmosphereMesh.material.uniforms['constant'].value = value;
        });
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

export {Earth};