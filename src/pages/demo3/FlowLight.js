import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
import Stats from "three/examples/jsm/libs/stats.module";
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {AfterimagePass} from 'three/examples/jsm/postprocessing/AfterimagePass.js';

// 流光，使用AfterimagePass实现
class FlowLight {
    constructor(container) {
        this.container = container;
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        this.composer = undefined;

        this.controls = undefined;
        this.stats = undefined;

        this.flowLight = undefined;
        this.lightPath = undefined;
        this.index = 0;

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
        this.initComposer();
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
        this.camera.position.set(0, 0, 100);
        this.camera.target = new THREE.Vector3(0, 0, 0);
    }

    initLight() {
        let directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    initModel() {
        let geometry = new THREE.Geometry();
        // 顶点数
        let n = 400;
        // 桃心缩放系数
        let a = 1.5;

        // 桃心方程
        for (let i = 1; i < n; i++) {
            let theta = i * 2.0 * Math.PI / n;
            let x = 16 * Math.pow(Math.sin(theta), 3);
            let y = 13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta);
            geometry.vertices.push(new THREE.Vector3(a * x, a * y, 0));
        }

        // 流光的路线
        this.lightPath = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xff0000}));
        this.scene.add(this.lightPath);

        // 流光
        let geometry2 = new THREE.SphereBufferGeometry(0.5, 64, 64)
        this.flowLight = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({color: 0xff0000}));
        this.scene.add(this.flowLight);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.autoClear = false;
        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
    }

    initComposer() {
        this.composer = new EffectComposer(this.renderer);
        let renderPass = new RenderPass(this.scene, this.camera); // 保存渲染结果，但不会输出到屏幕
        this.composer.addPass(renderPass);

        let afterimagePass = new AfterimagePass();
        afterimagePass.uniforms["damp"].value = 0.98
        this.composer.addPass(afterimagePass);
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

        this.renderer.clear();

        this.flowLight.position.copy(this.lightPath.geometry.vertices[this.index]);
        this.index++;
        if (this.index === this.lightPath.geometry.vertices.length) this.index = 0;

        this.composer.render();

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

export {FlowLight};