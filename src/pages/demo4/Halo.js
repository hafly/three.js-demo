import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import Stats from "three/examples/jsm/libs/stats.module";

class Halo {
    constructor(container) {
        this.container = container;
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        this.controls = undefined;

        this.group_wheel = [];

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
        this.camera.position.set(0, 100, 100);
        this.camera.target = new THREE.Vector3(0, 0, 0);
    }

    initLight() {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, 200, 100);
        this.scene.add(directionalLight);

        let hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2.0);
        hemiLight.position.set(0, 500, 0);
        this.scene.add(hemiLight);
    }

    initModel() {
        let self = this;
        let wheelGeometry = new THREE.PlaneBufferGeometry(10, 10);
        let wheelMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(require("./textures/guang2.jpg")),
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        let wheelLocation = [
            [-20, 0, 0],
            [-10, 0, 0],
            [0, 0, 0],
            [10, 0, 0],
            [20, 0, 0],
        ]

        for (let i = 0; i < wheelLocation.length; i++) {
            let wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(wheelLocation[i][0], wheelLocation[i][1], wheelLocation[i][2]);
            wheel.rotation.set(-Math.PI / 2, 0, 0);
            self.scene.add(wheel);
            self.group_wheel.push(wheel);
        }
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    initGUI() {
        let gui = new GUI({autoPlace: false});
        gui.domElement.style.position = 'fixed';
        gui.domElement.style.top = 0;
        gui.domElement.style.right = 0;
        this.container.appendChild(gui.domElement);
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

export {Halo};