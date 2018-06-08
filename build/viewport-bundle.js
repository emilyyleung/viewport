var Viewport = (function (THREE) {
	'use strict';

	function HelloWorld() {
		console.log("Hello World");
	}

	// renderer.js
	// import { Scene } from 'three';

	function Renderer(domParent, width, height) {
		console.log("Hello from the renderer!" + width + height);

		var container;

		init();
		animate();

		console.log("STEP 1");

		function init() {
			console.log("Hello from the init function!");
			container = domParent;
			document.body.appendChild( container );
			console.log(container);
			console.log(THREE);
			const scene = new THREE.Scene();
		}

		function animate() {
			console.log("Hello from the animate function!");
		}

		// var scene = new THREE.Scene();
		// console.log(scene)
	}

	// viewport.js

	function Viewport(domParent) {

		var foo = new HelloWorld();
		console.log("Hello from the Viewport!");

		var renderWidth = domParent.clientWidth;
		var renderHeight = domParent.clientHeight;

		// this._renderer = new Renderer(domParent, renderWidth, renderHeight);
		var renderer = new Renderer(domParent, renderWidth, renderHeight);
		console.log(renderer);

	}

	// index.js ENTRY POINT

	return Viewport;

}(null));
