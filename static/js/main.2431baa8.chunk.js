(this["webpackJsonpthree.js-test"]=this["webpackJsonpthree.js-test"]||[]).push([[0],{31:function(e,t,n){e.exports=n(47)},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){e.exports=n.p+"static/media/world.381c728e.png"},39:function(e,t,n){e.exports=n.p+"static/media/guang2.4f4d986a.jpg"},47:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),s=n(27),r=n.n(s),o=(n(36),n(2)),h=n(3),c=n(6),d=n(5),l=n(28),u=n(4),m=n(9),v=(n(37),function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return a.a.createElement("div",null,this.props.children)}}]),n}(a.a.Component)),p=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){var e={margin:"10px"};return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo1"},"Glow Shader")),a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo2"},"Eath Shader And Atmoshphere Sahder")),a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo3"},"FlowLight1")),a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo4"},"Halo")),a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo5"},"Gradient")),a.a.createElement("div",{style:e},a.a.createElement("a",{href:"#demo6"},"SweepingLight")))}}]),n}(a.a.Component),f=n(0),w=n(12),g=n(13),y=n(14),b="\n        uniform vec3 viewVector;\n        uniform float constant;\n        uniform float force;\n        varying float intensity;\n        void main()\n        {\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n            \n            vec3 noraml1 = normalize(normalMatrix * normal);\n            vec3 noraml2 = normalize(normalMatrix * cameraPosition);\n            \n            // \u5f3a\u5ea6\u5728\u9876\u70b9\u7740\u8272\u5668\u8ba1\u7b97\u3002\u6cd5\u5411\u91cf\u548c\u76f8\u673a\u89c6\u56fe\u5411\u91cf\u7684\u70b9\u4e58\uff0c0\u5e73\u884c1\u5782\u76f4\n            intensity = pow(constant - dot(noraml1, noraml2), force);\n        }\n    ",M="\n        uniform vec3 glowColor;\n        varying float intensity;\n        void main()\n        {\n            vec3 glow = glowColor * intensity;\n            gl_FragColor = vec4(glow, 1.0);\n        }\n    ",C=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.stats=void 0,this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.initGUI(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,400,800),this.camera.target=new f.L(0,0,0),this.scene.add(this.camera)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(1,1,1),this.scene.add(e)}},{key:"initModel",value:function(){var e=new f.D({uniforms:{constant:{type:"f",value:1},force:{type:"f",value:1.4},glowColor:{type:"c",value:new f.d(16776960)}},vertexShader:b,fragmentShader:M,side:f.i,blending:f.a,transparent:!0}),t=new f.F(100,32,32);this.sphereMesh=new f.r(t,e),this.sphereMesh.position.set(-150,0,0),this.scene.add(this.sphereMesh);var n=new f.e(150,150,150,2,2,2);this.cubeMesh=new f.r(n,e),this.cubeMesh.position.set(150,0,0),this.scene.add(this.cubeMesh)}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement)}},{key:"initGUI",value:function(){var e=this,t={constant:1,force:1.4,bs:!1,fs:!0,nb:!1,ab:!0,color:"#ffff00"},n=new g.a,i=n.addFolder("Glow Shader Attributes");i.add(t,"constant").min(0).max(1).step(.01).name("constant").onChange((function(t){e.sphereMesh.material.uniforms.constant.value=t})),i.add(t,"force").min(0).max(6).step(.01).name("force").onChange((function(t){e.sphereMesh.material.uniforms.force.value=t})),i.addColor(t,"color").name("Glow Color").onChange((function(t){e.sphereMesh.material.uniforms.glowColor.value.setHex(t.replace("#","0x"))})),i.open();var a=n.addFolder("Render side"),s=a.add(t,"fs").name("THREE.FrontSide").listen();s.onChange((function(t){t&&(r.setValue(!1),e.sphereMesh.material.side=f.i)}));var r=a.add(t,"bs").name("THREE.BackSide").listen();r.onChange((function(t){t&&(s.setValue(!1),e.sphereMesh.material.side=f.b)})),a.open();var o=n.addFolder("Blending style"),h=o.add(t,"nb").name("THREE.NormalBlending").listen();h.onChange((function(t){t&&(c.setValue(!1),e.sphereMesh.material.blending=f.w)}));var c=o.add(t,"ab").name("THREE.AdditiveBlending").listen();c.onChange((function(t){t&&(h.setValue(!1),e.sphereMesh.material.blending=f.a)})),o.open()}},{key:"update",value:function(){requestAnimationFrame(this.update),this.renderer.render(this.scene,this.camera),this.controls.update(),this.stats.update()}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),E=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="Glow Shader",new C(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),k={texture:{type:"t",value:null}},x="\n        varying vec3 vNormal;\n        varying vec2 vUv;\n        void main() {\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n            vNormal = normalize(normalMatrix * normal);\n            vUv = uv;\n        }\n    ",j="\n        uniform sampler2D texture;\n        varying vec3 vNormal;\n        varying vec2 vUv;\n        void main() {\n            vec3 diffuse = texture2D(texture, vUv).xyz;\n            float intensity = 1.1 - dot(vNormal, vec3(0.0, 0.0, 1.0));\n            vec3 atmosphere = vec3(1.0, 1.0, 1.0) * pow(intensity, 3.0);\n            gl_FragColor = vec4(diffuse + atmosphere, 1.0);\n        }\n    ",R={constant:{type:"f",value:.8}},S="\n        varying vec3 vNormal;\n        void main() {\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n         \n            vNormal = normalize(normalMatrix * normal);\n        }\n    ",z="\n        precision mediump float;\n        uniform float constant;\n        varying vec3 vNormal;\n        void main() {\n            // \u5f3a\u5ea6\u5728\u7247\u5143\u7740\u8272\u5668\u8ba1\u7b97\u3002\u6cd5\u5411\u91cf\u548c\u89c6\u56fe\u5411\u91cf\u7684\u70b9\u4e58\uff0c0\u5e73\u884c1\u5782\u76f4\n            float intensity = pow(constant - dot(vNormal, vec3(0, 0, 1.0)), 10.0);\n            gl_FragColor = vec4(1.0, 1.0, 1.0, intensity);\n        }\n    ",O=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.stats=void 0,this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.initGUI(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,280,350),this.camera.target=new f.L(0,0,0),this.scene.add(this.camera)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(1,1,1),this.scene.add(e)}},{key:"initModel",value:function(){var e=new f.I,t=f.J.clone(k),i=e.load(n(38));t.texture.value=i;var a=new f.D({uniforms:t,vertexShader:x,fragmentShader:j,blending:f.a,transparent:!0}),s=new f.F(100,32,32);s.rotateY(f.q.degToRad(-90)),this.earthMesh=new f.r(s,a),this.scene.add(this.earthMesh);var r=new f.D({uniforms:f.J.clone(R),vertexShader:S,fragmentShader:z,side:f.b,blending:f.a,transparent:!0});this.atmosphereMesh=new f.r(s,r),this.atmosphereMesh.scale.set(1.1,1.1,1.1),this.scene.add(this.atmosphereMesh)}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement)}},{key:"initGUI",value:function(){var e=this,t={earth:!0,atmosphere:!0,constant:.8},n=new g.a;n.add(t,"earth").name("earth visible").onChange((function(t){e.earthMesh.visible=t})),n.add(t,"atmosphere").name("atmosphere visible").onChange((function(t){e.atmosphereMesh.visible=t})),n.add(t,"constant").name("constant").min(0).max(1).step(.01).onChange((function(t){e.atmosphereMesh.material.uniforms.constant.value=t}))}},{key:"update",value:function(){requestAnimationFrame(this.update),this.renderer.render(this.scene,this.camera),this.controls.update(),this.stats.update()}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),P=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){new O(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),W=n(19),H=n(18),D=n(30),L=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.composer=void 0,this.controls=void 0,this.stats=void 0,this.flowLight=void 0,this.lightPath=void 0,this.index=0,this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.initComposer(),this.initGUI(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,0,100),this.camera.target=new f.L(0,0,0)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(1,1,1),this.scene.add(e)}},{key:"initModel",value:function(){for(var e=new f.j,t=1;t<400;t++){var n=2*t*Math.PI/400,i=16*Math.pow(Math.sin(n),3),a=13*Math.cos(n)-5*Math.cos(2*n)-2*Math.cos(3*n)-Math.cos(4*n);e.vertices.push(new f.L(1.5*i,1.5*a,0))}this.lightPath=new f.m(e,new f.n({color:16711680})),this.scene.add(this.lightPath);var s=new f.E(.5,64,64);this.flowLight=new f.r(s,new f.s({color:16711680})),this.scene.add(this.flowLight)}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.autoClear=!1,this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement)}},{key:"initComposer",value:function(){this.composer=new W.a(this.renderer);var e=new H.a(this.scene,this.camera);this.composer.addPass(e);var t=new D.a;t.uniforms.damp.value=.98,this.composer.addPass(t)}},{key:"initGUI",value:function(){new g.a}},{key:"update",value:function(){requestAnimationFrame(this.update),this.renderer.clear(),this.flowLight.position.copy(this.lightPath.geometry.vertices[this.index]),this.index++,this.index===this.lightPath.geometry.vertices.length&&(this.index=0),this.composer.render(),this.controls.update(),this.stats.update()}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),F=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="Flow Light",new L(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),I=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.group_wheel=[],this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.initGUI(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,100,100),this.camera.target=new f.L(0,0,0)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(0,200,100),this.scene.add(e);var t=new f.l(16777215,0,2);t.position.set(0,500,0),this.scene.add(t)}},{key:"initModel",value:function(){for(var e=new f.z(10,10),t=new f.u({map:(new f.I).load(n(39)),transparent:!0,blending:f.a,depthWrite:!1}),i=[[-20,0,0],[-10,0,0],[0,0,0],[10,0,0],[20,0,0]],a=0;a<i.length;a++){var s=new f.r(e,t);s.position.set(i[a][0],i[a][1],i[a][2]),s.rotation.set(-Math.PI/2,0,0),this.scene.add(s),this.group_wheel.push(s)}}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement)}},{key:"initGUI",value:function(){new g.a}},{key:"update",value:function(){requestAnimationFrame(this.update),this.renderer.render(this.scene,this.camera),this.controls.update(),this.stats.update()}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),G=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="Halo",new I(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),U="\n        varying vec3 iPosition;\n        void main(){\n            iPosition = position;\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n    ",V="\n        varying vec3 iPosition;\n        uniform float time;\n        void main(){\n            vec3 color = vec3(89./255.,208./255.,255./255.);\n            float height = iPosition.y + 15.;\n            float white = (distance(vec2(iPosition.x,iPosition.z),vec2(0.0))-6.0)/(6.0 * (sqrt(2.0)-1.0));\n            float alphax = smoothstep(0.0,1.0,white );\n            float alphay = smoothstep(1.0,0.0,height/25.0 + sin(time) * 0.2 );\n            if(height<0.1||height>29.9){\n                discard;\n            }\n            gl_FragColor = vec4(color +vec3(255.,0.,0.)* alphax * 0.0008,alphay*0.7);  \n        }\n    ",N=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.controls=void 0,this.stats=void 0,this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.initGUI(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,400,800),this.camera.target=new f.L(0,0,0),this.scene.add(this.camera)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(1,1,1),this.scene.add(e)}},{key:"initModel",value:function(){var e=new f.D({uniforms:{constant:{type:"f",value:1},force:{type:"f",value:1.4},glowColor:{type:"c",value:new f.d(16776960)}},vertexShader:U,fragmentShader:V,side:f.g,blending:f.a,transparent:!0}),t=new f.F(100,32,32);this.sphereMesh=new f.r(t,e),this.sphereMesh.position.set(-150,0,0),this.scene.add(this.sphereMesh);var n=new f.e(150,150,150,2,2,2);this.cubeMesh=new f.r(n,e),this.cubeMesh.position.set(150,0,0),this.scene.add(this.cubeMesh)}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement)}},{key:"initGUI",value:function(){var e=this,t={constant:1,force:1.4,bs:!1,fs:!0,nb:!1,ab:!0,color:"#ffff00"},n=new g.a,i=n.addFolder("Glow Shader Attributes");i.add(t,"constant").min(0).max(1).step(.01).name("constant").onChange((function(t){e.sphereMesh.material.uniforms.constant.value=t})),i.add(t,"force").min(0).max(6).step(.01).name("force").onChange((function(t){e.sphereMesh.material.uniforms.force.value=t})),i.addColor(t,"color").name("Glow Color").onChange((function(t){e.sphereMesh.material.uniforms.glowColor.value.setHex(t.replace("#","0x"))})),i.open();var a=n.addFolder("Render side"),s=a.add(t,"fs").name("THREE.FrontSide").listen();s.onChange((function(t){t&&(r.setValue(!1),e.sphereMesh.material.side=f.i)}));var r=a.add(t,"bs").name("THREE.BackSide").listen();r.onChange((function(t){t&&(s.setValue(!1),e.sphereMesh.material.side=f.b)})),a.open();var o=n.addFolder("Blending style"),h=o.add(t,"nb").name("THREE.NormalBlending").listen();h.onChange((function(t){t&&(c.setValue(!1),e.sphereMesh.material.blending=f.w)}));var c=o.add(t,"ab").name("THREE.AdditiveBlending").listen();c.onChange((function(t){t&&(h.setValue(!1),e.sphereMesh.material.blending=f.a)})),o.open()}},{key:"update",value:function(){requestAnimationFrame(this.update),this.renderer.render(this.scene,this.camera),this.controls.update(),this.stats.update()}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),A=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="\u53d1\u5149\u5899",new N(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),B=n(16),T={uniforms:{tDiffuse:{type:"t",value:null},time:{type:"f",value:-1}},vertexShader:"\n        varying vec2 vUv;\n        varying vec3 iPosition;\n        void main(){\n            vUv = uv;\n            iPosition = position;\n            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n        }\n    ",fragmentShader:"\n        uniform float time;\n        uniform sampler2D tDiffuse;\n        varying vec2 vUv;\n        varying vec3 iPosition;\n        void main(){\n            vec4 texel = texture2D(tDiffuse, vUv);\n            float x = iPosition.x;\n            float lighty = -x*1.2 + time;\n            float alpha = abs(iPosition.y - lighty);\n            if(alpha < 0.1){\n                float a = 1.0 -  alpha / 0.1;\n                float enda = smoothstep(0.0,1.0,a) + 1.0;\n                gl_FragColor = texel * enda;\n            }else{\n                gl_FragColor = texel;\n            }\n        }\n    "},_=function(){function e(t){Object(o.a)(this,e),this.container=t,this.scene=void 0,this.camera=void 0,this.renderer=void 0,this.composer=void 0,this.effect=void 0,this.controls=void 0,this.stats=void 0,this.type="add",this.update=this.update.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.init(),this.update()}return Object(h.a)(e,[{key:"init",value:function(){this.initScene(),this.initCamera(),this.initLight(),this.initModel(),this.initRenderer(),this.bindEvent()}},{key:"initScene",value:function(){this.scene=new f.C,this.stats=new y.a,this.container.appendChild(this.stats.dom)}},{key:"initCamera",value:function(){this.camera=new f.y(30,this.container.clientWidth/this.container.clientHeight,1,1e4),this.camera.position.set(0,400,800),this.camera.target=new f.L(0,0,0),this.scene.add(this.camera)}},{key:"initLight",value:function(){var e=new f.f(16777215);e.position.set(1,1,1),this.scene.add(e)}},{key:"initModel",value:function(){for(var e=new f.k,t=0;t<100;t++){var n=new f.E(1,4,4),i=new f.t({color:16777215,flatShading:!0}),a=new f.r(n,i);a.material=new f.t({color:new f.d(Math.random(),Math.random(),Math.random()),flatShading:!0}),a.material.needsUpdate=!0,a.position.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize(),a.position.multiplyScalar(400*Math.random()),a.rotation.set(2*Math.random(),2*Math.random(),2*Math.random()),a.scale.x=a.scale.y=a.scale.z=50*Math.random(),e.add(a)}this.scene.add(e)}},{key:"initRenderer",value:function(){this.renderer=new f.N({antialias:!0,alpha:!0}),this.renderer.setClearColor(0),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),this.container.appendChild(this.renderer.domElement),this.composer=new W.a(this.renderer),this.composer.addPass(new H.a(this.scene,this.camera)),this.effect=new B.a(T),this.composer.addPass(this.effect)}},{key:"initGUI",value:function(){var e=this,t={constant:1,force:1.4,bs:!1,fs:!0,nb:!1,ab:!0,color:"#ffff00"},n=new g.a,i=n.addFolder("Glow Shader Attributes");i.add(t,"constant").min(0).max(1).step(.01).name("constant").onChange((function(t){e.sphereMesh.material.uniforms.constant.value=t})),i.add(t,"force").min(0).max(6).step(.01).name("force").onChange((function(t){e.sphereMesh.material.uniforms.force.value=t})),i.addColor(t,"color").name("Glow Color").onChange((function(t){e.sphereMesh.material.uniforms.glowColor.value.setHex(t.replace("#","0x"))})),i.open();var a=n.addFolder("Render side"),s=a.add(t,"fs").name("THREE.FrontSide").listen();s.onChange((function(t){t&&(r.setValue(!1),e.sphereMesh.material.side=f.i)}));var r=a.add(t,"bs").name("THREE.BackSide").listen();r.onChange((function(t){t&&(s.setValue(!1),e.sphereMesh.material.side=f.b)})),a.open();var o=n.addFolder("Blending style"),h=o.add(t,"nb").name("THREE.NormalBlending").listen();h.onChange((function(t){t&&(c.setValue(!1),e.sphereMesh.material.blending=f.w)}));var c=o.add(t,"ab").name("THREE.AdditiveBlending").listen();c.onChange((function(t){t&&(h.setValue(!1),e.sphereMesh.material.blending=f.a)})),o.open()}},{key:"update",value:function(){requestAnimationFrame(this.update),this.composer.render(this.scene,this.camera),this.controls.update(),this.stats.update();var e=this.effect.uniforms.time.value;e>1?this.type="reduce":e<-1&&(this.type="add"),"add"==this.type?this.effect.uniforms.time.value+=.01:this.effect.uniforms.time.value-=.01}},{key:"onWindowResize",value:function(){var e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.composer.setSize(e,t)}},{key:"bindEvent",value:function(){this.controls=new w.a(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,window.addEventListener("resize",this.onWindowResize,!1)}}]),e}(),q=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"componentDidMount",value:function(){document.title="\u53d1\u5149\u5899",new _(this.ID)}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{ref:function(t){return e.ID=t},style:{width:"100%",height:"100vh"}})}}]),n}(a.a.Component),J=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(h.a)(n,[{key:"render",value:function(){return a.a.createElement(l.a,null,a.a.createElement(v,{history:Object(m.a)()},a.a.createElement(u.a,{path:"/",component:p,exact:!0}),a.a.createElement(u.a,{path:"/demo1",component:E,name:"Glow Shader"}),a.a.createElement(u.a,{path:"/demo2",component:P,name:"Eath Shader And Atmoshphere Sahder"}),a.a.createElement(u.a,{path:"/demo3",component:F,name:"FlowLight1"}),a.a.createElement(u.a,{path:"/demo4",component:G,name:"Halo"}),a.a.createElement(u.a,{path:"/demo5",component:A,name:"Gradient"}),a.a.createElement(u.a,{path:"/demo6",component:q,name:"SweepingLight"})))}}]),n}(a.a.Component);r.a.render(a.a.createElement(J,null),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.2431baa8.chunk.js.map