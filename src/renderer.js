// renderer.js
import * as THREE from 'three';
// import { Scene } from 'three';

export default function Renderer(domParent, width, height) {
	console.log("Hello from the renderer!" + width + height)

	var container;
	var camera, scene, renderer;

	init();
	animate();

	console.log("STEP 1")

	function init() {
		console.log("Hello from the init function!")
		container = domParent;
		document.body.appendChild( container );
		console.log(container)
		console.log(THREE)
		const scene = new THREE.Scene();
	}

	function animate() {
		console.log("Hello from the animate function!")
	}

}