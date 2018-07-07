// lights.js

import * as THREE from 'three';

export default function Lights() {
	this.spotLight = new THREE.SpotLight( 0xffffff );
	this.spotLight.angle = Math.PI / 5;
	this.spotLight.penumbra = 0.2;
	this.spotLight.position.set( 10, 10, 10 );
	this.spotLight.castShadow = true;
	this.spotLight.shadow.camera.near = 3;
	this.spotLight.shadow.camera.far = 10;
	this.spotLight.shadow.mapSize.width = 1024;
	this.spotLight.shadow.mapSize.height = 1024;

	return this.spotLight;
}