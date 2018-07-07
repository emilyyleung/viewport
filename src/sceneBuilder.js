// sceneBuilder.js
import { generateChecker } from './validator.js'

export default function SceneBuilder() {
	console.log("SCENEBUILDER")	
}

SceneBuilder.prototype.convert = function(data) {
	console.log("SceneBuilder Data");
	console.log(data);

	generateChecker(data)
}