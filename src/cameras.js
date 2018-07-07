// cameras.js

import * as THREE from 'three';

export default function Cameras(width, height) {
	this.setView(Cameras.VIEWS.perspective);
	this._width = width;
	this._height = height;
	this.perspCamera = new THREE.PerspectiveCamera(30, this._width/this._height, 0.1, 1000);

	this.perspCamera.position.set( 10, 10, 10 );
	this.perspCamera.lookAt(0,0,0)

	var flashlight = new THREE.DirectionalLight( 0xff0000, 1 );
    
    this.perspCamera.add( flashlight );

	this.getCamera = function() {
		if (this._view === Cameras.VIEWS.perspective) {
			// console.log("Got a camera!")
			return this._perspCamera;
		}
		// console.log("Did not get a camera");
	}

	this.isValidView = function(view) {
		return view != null && view.constructor === Number && view > -1 && view < Cameras.VIEWS.END;
	}

	this.setView = function(view) {
		if (!Cameras.isValidView(view)) return;
		this._view = view;

		var camera = this.getCamera();
	}


	return this.perspCamera;


	// this.orthoCamera = new THREE.OrthographicCamera(this._width / -2, this._width / 2, this._height / 2, this._height / -2, -1, 1000);
	// this.orthoCamera = new THREE.OrthographicCamera(100, -100, 100, -100, -1000, 1000);
	// return this.orthoCamera;
}

// Enumeration of all possible views for the camera
Cameras.VIEWS = {
	perspective: 0,
	top: 1,
	bottom: 2,
	front: 3,
	back: 4,
	right: 5,
	left: 6,
	END: 7
}

// Camera position array
Cameras.DEFAULT_POSITIONS = [
	[ 10, 10, -10 ], // perspective
	[ 0, 0, -100 ], // top
	[ 0, 0, 100 ], // bottom
	[ 0, 0, 0 ], // front
	[ 0, 0, 0 ], // back
	[ 0, 0, 0 ], // right
	[ 0, 0, 0 ] // left
];

// Camera rotation array
Cameras.DEFAULT_ROTATION = [
	[], // perspective
	[], // top
	[], // bottom
	[], // front
	[], // back
	[], // right
	[] // left
];

Cameras.isValidView = function(view) {
	return view != null && view.constructor === Number && view > -1 && view < Cameras.VIEWS.END;
}

Cameras.prototype.setView = function (view) {

	return console.log(view)
}