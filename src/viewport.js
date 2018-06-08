// viewport.js

import HelloWorld from './helloworld.js'
import Renderer from './renderer.js'
import * as THREE from 'three'

export default function Viewport(domParent) {

	var foo = new HelloWorld();
	console.log("Hello from the Viewport!");

	var renderWidth = domParent.clientWidth;
	var renderHeight = domParent.clientHeight;

	// this._renderer = new Renderer(domParent, renderWidth, renderHeight);
	var renderer = new Renderer(domParent, renderWidth, renderHeight);
	console.log(renderer)

}