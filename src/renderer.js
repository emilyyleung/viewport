// renderer.js
import * as THREE from 'three';
import Cameras from './cameras.js';
import AxisHelper from './helpers/axisHelper.js';
import GridHelper from './helpers/gridHelper.js';
import Lights from './lights.js';

// import * as isocahedron from './models/isocahedron.js'

export default function Renderer(domParent, width, height) {

	var link = "https://gist.githubusercontent.com/emilyyleung/ba90ac75b553973fc6b1dde6e1eeb465/raw/cc8e891ab3ee6f07356057152c198716f0a6df51/7_isocahedron.json"
	var link2 = "https://gist.githubusercontent.com/emilyyleung/40af5cc73f438278aef92f8827d1f71b/raw/10189d5bdbd4bb95143d5985f4b4d9138c4e4db3/rightwayup.json"

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

	this._clippingPlane = new THREE.Plane( new THREE.Vector3( (10, 10, -10), 0));
	this._helper = new THREE.PlaneHelper(this._clippingPlane, 10, 0xffff00)
	this._scene.add(this._helper);

	this._scene.add( new THREE.AmbientLight( 0xffffff ) );
	this._lights = new Lights();
	this._scene.add(this._lights);

	this.geometry = new THREE.BoxGeometry( 5, 5, 5 );
	this.material = new THREE.MeshPhongMaterial({
		color: 0x006DAA,
		shininess: 100,
		side: THREE.DoubleSide,
		clipShadows: true
	 });
	this.cube = new THREE.Mesh( this.geometry, this.material );
	// this._scene.add(this.cube);

	this.geo = new THREE.EdgesGeometry(this.geometry);
	this.mat = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 3 });
	this.wireframe = new THREE.LineSegments(this.geo, this.mat);
	// this._scene.add(this.wireframe);

	// Load external models
	this.loader = new THREE.ObjectLoader();
	function loadGeo(loader, geojson) {
		var model = loader.parse(geojson);
		var material = new THREE.MeshPhongMaterial({
			color: 0x006DAA,
			shininess: 100,
			side: THREE.DoubleSide,
			clipShadows: true
		 });
		const mesh = new THREE.Mesh(model.children[0].geometry, material)
		return mesh;
	};

	var model;

	fetchAPI()
	  .then(results => {
	    // console.log(results.json)
	    this._scene.add(loadGeo(this.loader, results.json))
	  });

	async function fetchAPI() {
	  let response = await fetch('https://raw.githubusercontent.com/emilyyleung/viewport-geometry/master/THREE-JSON/icosahedron.json')
	  let json = await response.json();

	  return {
	    json: json
	  }
	}

	// this._scene.add(loadGeo(this.loader, isocahedron.isocahedron))
	// this._scene.add(loadGeo(this.loader, link))
	// this._scene.add(this.loader.load(link))
	// this.loader.load(link, this.addToScene(obj))

	this.size = 10;
	this.divisions = 10;

	this._axisHelper = new AxisHelper(this.size / 2);
	this._scene.add(this._axisHelper);

	this._gridHelper = new GridHelper(this.size, this.divisions);
	this._scene.add(this._gridHelper);

	// Minimising the amount of files now by including the renderer here too!
	this.renderer = new THREE.WebGLRenderer({
		antialias: true,
		preserveDrawingBuffer: true,
		alpha: true
	});
	this.renderer.setSize(this._width, this._height);
	this.renderer.domElement.style.position = "absolute";
	this.renderer.setClearColor( 0x1F2232 ); // Change the background colour of the viewport
	// this.renderer.clippingPlanes = [this._clippingPlane];
	this.renderer.localClippingEnabled = true; //true

	this._perspCamera = new Cameras(this._width, this._height);

	this._controls = new THREE.OrbitControls(this._perspCamera, this.renderer.domElement)

	// console.log ( this.renderer.domElement);
	this.transform = new THREE.TransformControls(this._perspCamera, this.renderer.domElement);
	this.transform.addEventListener('change', function() {
		// console.log("transforming")
	});
	this.transform.attach(this._helper)
	this._scene.add(this.transform);

	this._controls.update();
	this.transform.update();
	// this._perspCamera = new THREE.PerspectiveCamera( 30, this._width/this._height, 0.1, 1000);
	// this._perspCamera.position.z = 5;

	requestAnimationFrame(() => this.animate());

}

Renderer.prototype.setClearColor = function(color, alpha) {
	this._clearColor = new THREE.Color(color);
	this._clearAlpha = alpha;
}

Renderer.prototype.animate = function() {
	this.renderer.render(this._scene, this._perspCamera);
	// this.renderer.render(this._helpersScene, this._perspCamera);
	// this.cube.rotation.x += 0.01;
	// this.cube.rotation.y += 0.01;
	// this.wireframe.rotation.x += 0.01;
	// this.wireframe.rotation.y += 0.01;
	requestAnimationFrame(() => this.animate());
}
