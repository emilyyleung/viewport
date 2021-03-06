var Viewport = (function (THREE) {
	'use strict';

	function HelloWorld() {
		console.log("Hello World");
	}

	// renderer.js

	function Renderer(domParent, width, height) {

		// Dom element that wraps the canvas
		this._domParent = domParent;

		// Current three.js geometry to render
		this._model = null;

		// The object containing the lights in the scene
		this._lights = null;

		this._width = width;
		this._height = height;

		// Scene containing geometry to be rendered in this viewport THREE.Scene
		this._scene = new THREE.Scene();

		// Thought I'd try to atleast get something in the scene to view. Will be moved to another module later!
		this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
		this.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
		this.cube = new THREE.Mesh( this.geometry, this.material );
		this._scene.add(this.cube);

		this.geo = new THREE.EdgesGeometry(this.geometry);
		this.mat = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 3 });
		this.wireframe = new THREE.LineSegments(this.geo, this.mat);
		this._scene.add(this.wireframe);

		// Minimising the amount of files now by including the renderer here too!
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			preserveDrawingBuffer: true,
			alpha: true
		});
		this.renderer.setSize(this._width, this._height);
		this.renderer.domElement.style.position = "absolute";

		this._perspCamera = new THREE.PerspectiveCamera( 30, width/height, 0.1, 1000);
		this._perspCamera.position.z = 5;

		// Here we create a new canvas to attach to attach the scene
		this._createCacheCanvas(this._width, this._height);

		this.setClearColor(0xFFFFFF);

		console.log(this.renderer.domElement);

		requestAnimationFrame(() => this.animate());
		this.animate = function() {
			this.renderer.render(this._scene, this._perspCamera);
			this.cube.rotation.x += 0.01;
			this.cube.rotation.y += 0.01;
			this.wireframe.rotation.x += 0.01;
			this.wireframe.rotation.y += 0.01;
			requestAnimationFrame(() => this.animate());

		};

	}

	Renderer.prototype.setClearColor = function(color, alpha) {
		this._clearColor = new THREE.Color(color);
		this._clearAlpha = alpha;
	};

	Renderer.prototype._createCacheCanvas = function(width, height) {
		this._cacheCanvas = document.createElement('canvas');
		this._cacheCanvas.width = width;
		this._cacheCanvas.height = height;
		this._cacheCanvas.style.position = 'absolute';
		this._domParent.appendChild(this._cacheCanvas);
		console.log(this._cacheCanvas);
	};

	// viewport.js

	function Viewport(domParent) {

		var foo = new HelloWorld();
		console.log("Hello from the Viewport!");

		var renderWidth = domParent.clientWidth;
		var renderHeight = domParent.clientHeight;

		// this._renderer = new Renderer(domParent, renderWidth, renderHeight);
		var renderer = new Renderer(domParent, renderWidth, renderHeight);
		domParent.appendChild( renderer.renderer.domElement );
		// renderer.doRender();
		// console.log(renderer);

		console.log("Viewport has finished loading");

	}

	// index.js ENTRY POINT

	return Viewport;

}(THREE));
