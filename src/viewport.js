// viewport.js

import HelloWorld from './helloworld.js'
import Renderer from './renderer.js'
import * as THREE from 'three'
import Validator from './validator.js'
import SceneBuilder from './sceneBuilder.js'

export default function Viewport(domParent) {
	var valid = new Validator();

	var foo = new HelloWorld();

	var renderWidth = domParent.clientWidth;
	var renderHeight = domParent.clientHeight;

	var renderer = new Renderer(domParent, renderWidth, renderHeight);
	domParent.appendChild( renderer.renderer.domElement );

	window.addEventListener("keypress", myEventHandler, false)

	this._validator = new Validator()

	this._sceneBuilder = new SceneBuilder();

}

// Obtain json and convert to json object
Viewport.prototype.setGeometryJson = function(dataString) {
	var dataObj = JSON.parse(JSON.stringify(dataString));

	this.setGeometryEntity(dataObj)
}

Viewport.prototype.setGeometryEntity = function(data) {
	return new Promise((resolve, reject) => {
		if(this.running) {
			reject(new Error("REJECT"))
		}
		console.log("ACCEPT")
		this._sceneBuilder.convert(data)
	})
}

function myEventHandler(e) {
	var keyCode = e.keyCode;
	console.log(keyCode);
	if(keyCode == 115) {
		console.log("SAVEEEEEEEEEEEEEEED")
	} else {
		console.log("I am a letter")
	}
}