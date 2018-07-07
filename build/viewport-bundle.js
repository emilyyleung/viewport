var Viewport = (function (THREE) {
	'use strict';

	function HelloWorld() {
		console.log("Hello World");
	}

	// cameras.js

	function Cameras(width, height) {
		this.setView(Cameras.VIEWS.perspective);
		this._width = width;
		this._height = height;
		this.perspCamera = new THREE.PerspectiveCamera(30, this._width/this._height, 0.1, 1000);

		this.perspCamera.position.set( 10, 10, 10 );
		this.perspCamera.lookAt(0,0,0);

		var flashlight = new THREE.DirectionalLight( 0xff0000, 1 );
	    
	    this.perspCamera.add( flashlight );

		this.getCamera = function() {
			if (this._view === Cameras.VIEWS.perspective) {
				// console.log("Got a camera!")
				return this._perspCamera;
			}
			// console.log("Did not get a camera");
		};

		this.isValidView = function(view) {
			return view != null && view.constructor === Number && view > -1 && view < Cameras.VIEWS.END;
		};

		this.setView = function(view) {
			if (!Cameras.isValidView(view)) return;
			this._view = view;

			var camera = this.getCamera();
		};


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
	};

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
	};

	Cameras.prototype.setView = function (view) {

		return console.log(view)
	};

	// axisHelper.js

	function AxisHelper(size) {
		var axesHelper = new THREE.AxesHelper(size);

		return axesHelper;
	}

	// gridHelper.js

	function GridHelper(size, divisions) {
		var gridHelper = new THREE.GridHelper(size, divisions);

		return gridHelper;
	}

	// lights.js

	function Lights() {
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

	// renderer.js

	// import * as isocahedron from './models/isocahedron.js'

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

		this._clippingPlane = new THREE.Plane( new THREE.Vector3( (-10), 0));
		this._helper = new THREE.PlaneHelper(this._clippingPlane, 10, 0xffff00);
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
			const mesh = new THREE.Mesh(model.children[0].geometry, material);
			return mesh;
		}
		fetchAPI()
		  .then(results => {
		    // console.log(results.json)
		    this._scene.add(loadGeo(this.loader, results.json));
		  });

		async function fetchAPI() {
		  let response = await fetch('https://raw.githubusercontent.com/emilyyleung/viewport-geometry/master/THREE-JSON/icosahedron.json');
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

		this._controls = new THREE.OrbitControls(this._perspCamera, this.renderer.domElement);

		// console.log ( this.renderer.domElement);
		this.transform = new THREE.TransformControls(this._perspCamera, this.renderer.domElement);
		this.transform.addEventListener('change', function() {
			// console.log("transforming")
		});
		this.transform.attach(this._helper);
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
	};

	Renderer.prototype.animate = function() {
		this.renderer.render(this._scene, this._perspCamera);
		// this.renderer.render(this._helpersScene, this._perspCamera);
		// this.cube.rotation.x += 0.01;
		// this.cube.rotation.y += 0.01;
		// this.wireframe.rotation.x += 0.01;
		// this.wireframe.rotation.y += 0.01;
		requestAnimationFrame(() => this.animate());
	};

	var index = 42;

	/**
	 * @module template
	 * @description
	 * Defines a small templater functionality for creating functions body.
	 */

	/**
	 * @name template
	 * @type function
	 * @description
	 * Provides a templater function, which adds a line of code into generated function body.
	 *
	 * @param {object} state - used in visit and reference method to iterate and find schemas.
	 * @param {DjvConfig} options
	 * @return {function} tpl
	 */
	function template(state, options) {
	  function tpl(expression, ...args) {
	    let last;

	    tpl.lines.push(
	      expression
	        .replace(/%i/g, () => 'i')
	        .replace(/\$(\d)/g, (match, index) => `${args[index - 1]}`)
	        .replace(/(%[sd])/g, () => {
	          if (args.length) {
	            last = args.shift();
	          }

	          return `${last}`;
	        })
	    );

	    return tpl;
	  }

	  const error = typeof options.errorHandler === 'function' ?
	    options.errorHandler :
	    function defaultErrorHandler(errorType) {
	      const path = this.data.toString().replace(/^data/, '');
	      const dataPath = path
	        .replace(/\['([^']+)'\]/ig, '.$1')
	        .replace(/\[(i[0-9]*)\]/ig, '[\'+$1+\']');
	      const schemaPath = `#${
        path
          .replace(/\[i([0-9]*)\]/ig, '/items')
          .replace(/\['([^']+)'\]/ig, '/properties/$1')
      }/${errorType}`;

	      return `return {
        keyword: '${errorType}',
        dataPath: '${dataPath}',
        schemaPath: '${schemaPath}'
      };`;
	    };

	  Object.assign(tpl, {
	    cachedIndex: 0,
	    cached: [],
	    cache(expression) {
	      const layer = tpl.cached[tpl.cached.length - 1];
	      if (layer[expression]) {
	        return `i${layer[expression]}`;
	      }

	      tpl.cachedIndex += 1;
	      layer[expression] = tpl.cachedIndex;
	      return `(i${layer[expression]} = ${expression})`;
	    },
	    data: ['data'],
	    error,
	    lines: [],
	    schema: ['schema'],
	    push: tpl,
	    /**
	     * @name link
	     * @description
	     * Get schema validator by url
	     * Call state link to generate or get cached function
	     * @type {function}
	     * @param {string} url
	     * @return {string} functionName
	     */
	    link(url) {
	      return `f${state.link(url)}`;
	    },
	    /**
	     * @name visit
	     * @description
	     * Create new cache scope and visit given schema
	     * @type {function}
	     * @param {object} schema
	     * @return {void}
	     */
	    visit(schema) {
	      tpl.cached.push({});
	      state.visit(schema, tpl);
	      tpl.cached.pop();
	    },
	  });

	  function dataToString() {
	    return this.join('.').replace(/\.\[/g, '[');
	  }
	  tpl.data.toString = dataToString;
	  tpl.schema.toString = dataToString;

	  return tpl;
	}

	/**
	 * @name restore
	 * @type function
	 * @description
	 * Generate a function by given body with a schema in a closure
	 *
	 * @param {string} source - function inner & outer body
	 * @param {object} schema - passed as argument to meta function
	 * @param {DjvConfig} config
	 * @return {function} tpl
	 */
	function restore(source, schema, { inner } = {}) {
	  /* eslint-disable no-new-func */
	  const tpl = new Function('schema', source)(schema);
	  /* eslint-enable no-new-func */

	  if (!inner) {
	    tpl.toString = function toString() {
	      return source;
	    };
	  }

	  return tpl;
	}

	/**
	 * Configuration for template functions
	 * @typedef {object} TemplateOptions
	 * @property {string[]} context
	 * @property {string[]} index
	 * @property {boolean?} inner - a generating object should be considered as inner
	 * @property {boolean?} defineErrors - if erros should be defined
	 * @property {string[]} lines - content templates
	 */

	/**
	 * @private
	 * @name makeVariables
	 * @type function
	 * @description
	 * Generate internal variables
	 *
	 * @param {TemplateOptions} options
	 * @return {string} variables
	 */
	function makeVariables({ defineErrors, index }) {
	  /**
	   * @var {array} errors - empty array for pushing errors ability
	   * @see errorHandler
	   */
	  const errors = defineErrors ? 'const errors = [];' : '';
	  const variables = index ?
	    `let i${Array(...Array(index))
      .map((value, i) => i + 1)
      .join(',i')};` :
	    '';

	  // @see map array with holes trick
	  // http://2ality.com/2013/11/initializing-arrays.html
	  // TODO change var to const
	  return `
    ${errors}
    ${variables}
  `;
	}

	/**
	 * @private
	 * @name makeHelpers
	 * @type function
	 * @description
	 * Generate internal helpers executed in outer function
	 *
	 * @param {TemplateOptions} options
	 * @return {string} functions
	 */
	function makeHelpers({ context, inner }) {
	  if (inner || !context.length) {
	    return '';
	  }

	  const functions = [];
	  const references = [];

	  context
	    .forEach((value, i) => {
	      if (typeof value === 'number') {
	        references.push(`${i + 1} = f${value + 1}`);
	        return;
	      }
	      functions.push(`${i + 1} = ${value}`);
	    });

	  return `const f${functions.concat(references).join(', f')};`;
	}

	/**
	 * @private
	 * @name makeContent
	 * @type function
	 * @description
	 * Generate internal function body content, including variables
	 *
	 * @param {TemplateOptions} options
	 * @return {string} functions
	 */
	function makeContent(options) {
	  const { defineErrors, lines } = options;

	  const variables = makeVariables(options);
	  const errors = defineErrors ? 'if(errors.length) return errors;' : '';
	  const content = lines.join('\n');

	  return `
    "use strict";
    ${variables}
    ${content}
    ${errors}
  `;
	}

	/**
	 * @name body
	 * @type function
	 * @description
	 * Generate a function body, containing internal variables and helpers
	 *
	 * @param {object} tpl - template instance, containing all analyzed schema related data
	 * @param {object} state - state of schema generation
	 * @param {DjvConfig} config
	 * @return {string} body
	 */
	function body({ cachedIndex, lines }, { context }, { inner, errorHandler } = {}) {
	  const options = {
	    context,
	    inner,
	    defineErrors: errorHandler,
	    index: cachedIndex,
	    lines,
	  };

	  const helpers = makeHelpers(options);
	  const content = makeContent(options);

	  return `
    ${helpers}
    function f0(data) {
      ${content}
    }
    return f0;
  `;
	}

	/**
	 * @name templateExpression
	 * @type function
	 * @description
	 * Es6 template helper function
	 * Transforms a validator utilities into generated functions body
	 * @return {function} template
	 */
	function templateExpression(strings, ...keys) {
	  return (...values) => {
	    let dict = values[values.length - 1] || {};
	    let result = [strings[0]];
	    keys.forEach((key, i) => {
	      let value = Number.isInteger(key) ? values[key] : dict[key];
	      result.push(value, strings[i + 1]);
	    });
	    return result.join('');
	  };
	}

	var template_1 = {
	  body,
	  restore,
	  template,
	  expression: templateExpression,
	};

	/**
	 * @module formats
	 * @description
	 * Validators as string for format keyword rules.
	 * A validator is a string, which when executed returns `false` if test is failed, `true` otherwise.
	 */

	const { expression } = template_1;

	var formats = {
	  alpha: expression`!/^[a-zA-Z]+$/.test(${'data'})`,
	  alphanumeric: expression`!/^[a-zA-Z0-9]+$/.test(${'data'})`,
	  identifier: expression`!/^[-_a-zA-Z0-9]+$/.test(${'data'})`,
	  hexadecimal: expression`!/^[a-fA-F0-9]+$/.test(${'data'})`,
	  numeric: expression`!/^[0-9]+$/.test(${'data'})`,
	  'date-time': expression`isNaN(Date.parse(${'data'})) || ~${'data'}.indexOf(\'/\')`,
	  uppercase: expression`${'data'} !== ${'data'}.toUpperCase()`,
	  lowercase: expression`${'data'} !== ${'data'}.toLowerCase()`,
	  hostname: expression`${'data'}.length >= 256 || !/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])(\\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9]))*$/.test(${'data'})`,
	  uri: expression`!/^[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&\'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?$/.test(${'data'})`,
	  email: expression`!/^[^@]+@[^@]+\\.[^@]+$/.test(${'data'})`,
	  ipv4: expression`!/^(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}\\.(\\d?\\d?\\d){0,255}$/.test(${'data'}) || ${'data'}.split(".")[3] > 255`,
	  ipv6: expression`!/^((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|$))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})$/.test(${'data'})`,
	  regex: expression`/[^\\\\]\\\\[^.*+?^\${}()|[\\]\\\\bBcdDfnrsStvwWxu0-9]/i.test(${'data'})`,
	  // TODO optimize uri-reference regex... too long
	  'json-pointer': expression`!/^$|^\\/(?:~(?=[01])|[^~])*$/i.test(${'data'})`,
	  'uri-reference': expression`!/^(?:[A-Za-z][A-Za-z0-9+\\-.]*:(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&\'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?|(?:\\/\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&\'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\\/(?:(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\\-._~!$&\'()*+,;=@]|%[0-9A-Fa-f]{2})+(?:\\/(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\\?(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?(?:\\#(?:[A-Za-z0-9\\-._~!$&\'()*+,;=:@\\/?]|%[0-9A-Fa-f]{2})*)?)$/i.test(${'data'})`,
	  'uri-template': expression`!/^(?:(?:[^\\x00-\\x20"\'<>%\\\\^\`{|}]|%[0-9a-f]{2})|\\{[+#.\\/;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?:\\:[1-9][0-9]{0,3}|\\*)?)*\\})*$/i.test(${'data'})`,
	};

	var required = function required(schema, tpl) {
	  if (!Array.isArray(schema.required)) {
	    return;
	  }

	  tpl(`if (typeof ${tpl.data} === 'object' && !Array.isArray(${tpl.data})) {
    ${schema.required.map((name) => {
      const condition = `!${tpl.data}.hasOwnProperty("${name}")`;
      const error = tpl.error('required', name);
      return `if (${condition}) ${error}`;
    }).join('')}
  }`);
	};

	var format = function format(schema, tpl) {
	  if (typeof schema.format === 'undefined') {
	    return;
	  }

	  const formatter = formats[schema.format];
	  if (typeof formatter !== 'function') {
	    return;
	  }

	  const { data } = tpl;
	  const condition = formatter({ data, schema });
	  const error = tpl.error('format');

	  tpl(`if (${condition}) ${error}`);
	};

	/**
	 * @module properties
	 * @description
	 * Validators as string for properties keyword rules.
	 * A validator is a function, which when executed returns
	 * - `false` if test is failed,
	 * - `true` otherwise.
	 */
	var properties = {
	  readOnly: 'false',
	  exclusiveMinimum(schema) {
	    return `%s <= ${schema.exclusiveMinimum}`;
	  },
	  minimum(schema) {
	    return `%s < ${schema.minimum}`;
	  },
	  exclusiveMaximum(schema) {
	    return `%s >= ${schema.exclusiveMaximum}`;
	  },
	  maximum(schema) {
	    return `%s > ${schema.maximum}`;
	  },
	  multipleOf: '($1/$2) % 1 !== 0 && typeof $1 === "number"',
	  // When the instance value is a string
	  // this provides a regular expression that a string instance MUST match in order to be valid.
	  pattern(schema) {
	    let pattern;
	    let modifiers;

	    if (typeof schema.pattern === 'string') { pattern = schema.pattern; } else {
	      pattern = schema.pattern[0];
	      modifiers = schema.pattern[1];
	    }

	    const regex = new RegExp(pattern, modifiers);
	    return `typeof ($1) === "string" && !${regex}.test($1)`;
	  },
	  /**
	  * Creates an array containing the numeric code points of each Unicode
	  * character in the string. While JavaScript uses UCS-2 internally,
	  * this function will convert a pair of surrogate halves (each of which
	  * UCS-2 exposes as separate characters) into a single code point,
	  * matching UTF-16.
	  * @see `punycode.ucs2.encode`
	  * @see <https://mathiasbynens.be/notes/javascript-encoding>
	  * @memberOf punycode.ucs2
	  * @name decode
	  * @param {String} string The Unicode input string (UCS-2).
	  * @returns {Array} The new array of code points.
	  */
	  minLength: 'typeof $1 === "string" && function dltml(b,c){for(var a=0,d=b.length;a<d&&c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return!!c}($1, $2)',
	  maxLength: 'typeof $1 === "string" && function dmtml(b,c){for(var a=0,d=b.length;a<d&&0<=c;){var e=b.charCodeAt(a++);55296<=e&&56319>=e&&a<d&&56320!==(b.charCodeAt(a++)&64512)&&a--;c--}return 0>c}($1, $2)',
	  // This attribute defines the minimum number of values
	  // in an array when the array is the instance value.
	  minItems: '$1.length < $2 && Array.isArray($1)',
	  // This attribute defines the maximum number of values
	  // in an array when the array is the instance value.
	  maxItems: '$1.length > $2 && Array.isArray($1)',
	  // TODO without some
	  uniqueItems(schema, fn) {
	    if (!schema.uniqueItems) {
	      return 'true';
	    }

	    fn(fn.cache('{}'));
	    return `Array.isArray($1) && $1.some(function(item, key) {
      if(item !== null && typeof item === "object") key = JSON.stringify(item);
      else key = item;
      if(${fn.cache('{}')}.hasOwnProperty(key)) return true;
      ${fn.cache('{}')}[key] = true;
    })`;
	  },
	  // ***** object validation ****
	  minProperties: '!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length < $2',
	  // An object instance is valid against "maxProperties"
	  // if its number of properties is less than, or equal to, the value of this keyword.
	  maxProperties: '!Array.isArray($1) && typeof $1 === "object" && Object.keys($1).length > $2',
	  // ****** all *****
	  enum(schema, fn) {
	    return schema.enum.map((value) => {
	      let $1 = '$1';
	      let comparedValue = value;

	      if (typeof value === 'object') {
	        comparedValue = `'${JSON.stringify(value)}'`;
	        $1 = fn.cache('JSON.stringify($1)');
	      } else if (typeof value === 'string') {
	        comparedValue = `'${value}'`;
	      }

	      return `${$1} !== ${comparedValue}`;
	    }).join(' && ');
	  }
	};

	/**
	 * @module keywords
	 * @description
	 * A list of keywords used in specification.
	 */
	var keywords = [
	  '$ref',
	  '$schema',
	  'type',
	  'not',
	  'anyOf',
	  'allOf',
	  'oneOf',
	  'properties',
	  'patternProperties',
	  'additionalProperties',
	  'items',
	  'additionalItems',
	  'required',
	  'default',
	  'title',
	  'description',
	  'definitions',
	  'dependencies',
	  '$id',
	  'contains',
	  'const',
	  'examples'
	];

	/**
	 * @module utils
	 * @description
	 * Basic utilities for djv project
	 */

	/**
	 * @name asExpression
	 * @type {function}
	 * @description
	 * Transform function or string to expression
	 * @see validators
	 * @param {function|string} fn
	 * @param {object} schema
	 * @param {object} tpl templater instance
	 * @returns {string} expression
	 */
	function asExpression(fn, schema, tpl) {
	  if (typeof fn !== 'function') {
	    return fn;
	  }

	  return fn(schema, tpl);
	}

	/**
	 * @name hasProperty
	 * @type {function}
	 * @description
	 * Check if the property exists in a given object
	 * @param {object} object
	 * @param {string} property
	 * @returns {boolean} exists
	 */
	function hasProperty(object, property) {
	  return (
	    typeof object === 'object' &&
	    Object.prototype.hasOwnProperty.call(object, property)
	  );
	}

	var utils = {
	  asExpression,
	  hasProperty,
	};

	const { asExpression: asExpression$1 } = utils;

	var property = function property(schema, tpl) {
	  Object.keys(schema)
	    .forEach((key) => {
	      if (keywords.indexOf(key) !== -1 || key === 'format') {
	        return;
	      }

	      const condition = asExpression$1(properties[key], schema, tpl);
	      if (!condition) {
	        return;
	      }
	      const error = tpl.error(key);

	      tpl(`if (${condition}) ${error}`, tpl.data, schema[key]);
	    });
	};

	var types = {
	  null: '%s !== null',
	  string: 'typeof %s !== "string"',
	  boolean: 'typeof %s !== "boolean"',
	  number: 'typeof %s !== "number" || %s !== %s',
	  integer: 'typeof %s !== "number" || %s % 1 !== 0',
	  object: '!%s || typeof %s !== "object" || Array.isArray(%s)',
	  array: '!Array.isArray(%s)',
	  date: '!(%s instanceof Date)'
	};

	const { hasProperty: hasProperty$1 } = utils;

	var type = function type(schema, tpl) {
	  if (!hasProperty$1(schema, 'type')) {
	    return;
	  }

	  const error = tpl.error('type', schema.type);
	  const condition = `(${[].concat(schema.type).map(key => types[key]).join(') && (')})`;

	  tpl(`if (${condition}) ${error}`, tpl.data);
	};

	const { hasProperty: hasProperty$2 } = utils;

	var $ref = function $ref(schema, tpl) {
	  if (!hasProperty$2(schema, '$ref')) {
	    return false;
	  }

	  const condition = `${tpl.link(schema.$ref)}(${tpl.data})`;
	  const error = tpl.error('$ref');

	  tpl(`if (${condition}) ${error}`);

	  // All other properties in a "$ref" object MUST be ignored.
	  // @see https://tools.ietf.org/html/draft-wright-json-schema-01#section-8
	  return true;
	};

	const { hasProperty: hasProperty$3 } = utils;

	var not = function not(schema, tpl) {
	  if (!hasProperty$3(schema, 'not')) {
	    return;
	  }

	  const condition = `${tpl.link(schema.not)}(${tpl.data})`;
	  const error = tpl.error('not');

	  tpl(`if (!${condition}) ${error}`);
	};

	const { hasProperty: hasProperty$4 } = utils;

	var anyOf = function anyOf(schema, tpl) {
	  if (!hasProperty$4(schema, 'anyOf')) {
	    return;
	  }

	  const error = tpl.error('anyOf');
	  const condition = schema.anyOf
	    .map(reference => `${tpl.link(reference)}(${tpl.data})`)
	    .join(' && ');

	  tpl(`if (${condition}) ${error}`);
	};

	const { hasProperty: hasProperty$5 } = utils;

	var oneOf = function oneOf(schema, tpl) {
	  if (!hasProperty$5(schema, 'oneOf')) {
	    return;
	  }

	  const fns = schema.oneOf.map(reference => tpl.link(reference));
	  const arr = tpl.cache(`[${fns}]`);
	  const cachedArr = tpl.cache(`[${fns}]`);
	  const index = tpl.cache(`${cachedArr}.length - 1`);
	  const cachedIndex = tpl.cache(`${cachedArr}.length - 1`);
	  const count = tpl.cache('0');
	  const cachedCount = tpl.cache('0');
	  const error = tpl.error('oneOf');

	  tpl(`for (
    ${arr}, ${index}, ${count};
    ${cachedIndex} >= 0 && ${cachedIndex} < ${cachedArr}.length;
    ${cachedIndex}--) {
      if(!${cachedArr}[${cachedIndex}](${tpl.data})) ${cachedCount}++;
    }
    if (${cachedCount} !== 1) ${error}
  `);
	};

	const { hasProperty: hasProperty$6 } = utils;

	var allOf = function allOf(schema, tpl) {
	  if (!hasProperty$6(schema, 'allOf')) {
	    return;
	  }

	  const error = tpl.error('allOf');
	  const condition = schema.allOf
	    .map(reference => `${tpl.link(reference)}(${tpl.data})`)
	    .join(' || ');

	  tpl(`if (${condition}) ${error}`);
	};

	/**
	 * @module schema
	 * @description
	 * Low-level utilities to check, create and transform schemas
	 */

	/**
	 * @name transformation
	 * @type {object}
	 * @description
	 * Schema values transformation
	 */
	const transformation = {
	  ANY_SCHEMA: {},
	  NOT_ANY_SCHEMA: { not: {} },
	};

	/**
	 * @name is
	 * @type {function}
	 * @description
	 * Verify the object could be a schema
	 * Since draft-06 supports boolean as a schema definition
	 * @param {object} schema
	 * @returns {boolean} isSchema
	 */
	function is(schema) {
	  return (
	    typeof schema === 'object' ||
	    typeof schema === 'boolean'
	  );
	}

	/**
	 * @name transform
	 * @type {function}
	 * @description
	 * Transform a schema pseudo presentation
	 * Since draft-06 supports boolean as a schema definition
	 * @param {object} schema
	 * @returns {object} schema
	 */
	function transform(schema) {
	  if (schema === true) {
	    return transformation.ANY_SCHEMA;
	  } else if (schema === false) {
	    return transformation.NOT_ANY_SCHEMA;
	  }
	  return schema;
	}

	/**
	 * @name make
	 * @type {function}
	 * @description
	 * Generate a simple schema by a given object
	 * @param {any} instance
	 * @returns {object} schema
	 */
	function make(instance) {
	  if (typeof instance !== 'object' || instance === null) {
	    return { enum: [instance] };
	  }

	  if (Array.isArray(instance)) {
	    return {
	      items: instance.map(make),
	        // other items should be valid by `false` schema, aka not exist at all
	      additionalItems: false
	    };
	  }

	  const required = Object.keys(instance);
	  return {
	    properties: required.reduce((memo, key) => (
	      Object.assign({}, memo, {
	        [key]: make(instance[key])
	      })
	    ), {}),
	    required,
	    // other properties should be valid by `false` schema, aka not exist at all
	    // additionalProperties: false,
	  };
	}

	var schema = {
	  is,
	  make,
	  transform,
	  transformation,
	};

	const { hasProperty: hasProperty$7 } = utils;
	const { is: isSchema } = schema;

	// @see http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7
	var dependencies = function dependencies(schema$$1, tpl) {
	  if (!hasProperty$7(schema$$1, 'dependencies')) {
	    return;
	  }

	  Object.keys(schema$$1.dependencies)
	  .forEach((dependency) => {
	    const value = schema$$1.dependencies[dependency];
	    const error = tpl.error('dependencies');

	    tpl(`if (${tpl.data}.hasOwnProperty("${dependency}")) {`);
	    if (Array.isArray(value) || typeof value === 'string') {
	      [...value]
	        .map(property => `if (!${tpl.data}.hasOwnProperty("${property}")) ${error}`)
	        .map(tpl);
	    } else if (isSchema(value)) {
	      tpl.visit(value);
	    }
	    tpl('}');
	  });
	};

	const { hasProperty: hasProperty$8 } = utils;

	var properties$1 = function properties(schema, tpl) {
	  if (!hasProperty$8(schema, 'properties') || typeof schema.properties !== 'object') {
	    return;
	  }

	  Object.keys(schema.properties)
	    .forEach((propertyKey) => {
	      const propertySchema = schema.properties[propertyKey];
	      if (typeof propertySchema === 'object' && !Object.keys(propertySchema).length) {
	        return;
	      }

	      const isNotRequired = !schema.required || schema.required.indexOf(propertyKey) === -1;
	      if (isNotRequired) {
	        tpl(`if (${tpl.data}.hasOwnProperty("${propertyKey}")) {`);
	      }

	      tpl.data.push(`['${propertyKey}']`);
	      tpl.visit(propertySchema);
	      tpl.data.pop();

	      if (isNotRequired) {
	        tpl('}');
	      }
	    });
	};

	const { hasProperty: hasProperty$9 } = utils;

	var patternProperties = function patternProperties(schema, tpl) {
	  const hasAdditionalProperties = hasProperty$9(schema, 'additionalProperties') && schema.additionalProperties !== true;
	  const hasPatternProperties = hasProperty$9(schema, 'patternProperties');

	  if (!hasAdditionalProperties && !hasPatternProperties) {
	    return;
	  }

	  // When the instance value is an object,
	  // the property values of the instance object
	  // MUST conform to the property definitions in this object.
	  tpl(`if(typeof ${tpl.data} === 'object' && !Array.isArray(${tpl.data})) {`);

	  tpl(tpl.cache('null'));
	  const property = tpl.cache('null');
	  const visitAdditionalProperties = () => {
	    if (schema.additionalProperties === false) {
	      tpl(tpl.error('additionalProperties'));
	    } else if (schema.additionalProperties) {
	      tpl.data.push(`[${property}]`);
	      tpl.visit(schema.additionalProperties);
	      tpl.data.pop();
	    }
	  };

	  tpl(`for (${property} in ${tpl.data}) {`);
	  if (hasAdditionalProperties && hasPatternProperties) {
	    tpl(tpl.cache('false'));
	  }

	  if (hasPatternProperties) {
	    Object.keys(schema.patternProperties)
	      .forEach((propertyKey) => {
	        tpl(`if (${new RegExp(propertyKey)}.test(${property})) {`);
	        if (hasAdditionalProperties) {
	          tpl(`${tpl.cache('false')} = true;`);
	        }

	        const propertySchema = schema.patternProperties[propertyKey];
	        tpl.data.push(`[${property}]`);
	        tpl.visit(propertySchema);
	        tpl.data.pop();
	        tpl('}');

	        if (schema.properties) {
	          tpl(`if (${hasAdditionalProperties ? `${tpl.cache('false')} || ` : ''} ${tpl.schema}.properties.hasOwnProperty(${property})) continue;`);
	        } else if (hasAdditionalProperties) {
	          tpl(`if (${tpl.cache('false')}) continue;`);
	        }

	        visitAdditionalProperties();
	      });
	  } else {
	    if (schema.properties) {
	      tpl(`if(${tpl.schema}.properties.hasOwnProperty(${property})) continue;`);
	    }
	    visitAdditionalProperties();
	  }

	  tpl('}}');
	};

	const { hasProperty: hasProperty$a } = utils;

	var items = function items(schema, tpl) {
	  if (!hasProperty$a(schema, 'items')) {
	    return;
	  }

	  const itemsLength = schema.items.length;
	  const error = tpl.error('additionalItems');
	  const { data } = tpl;

	  tpl(`if(Array.isArray(${data})) {`);
	  if (Array.isArray(schema.items)) {
	    if (schema.additionalItems === false) {
	      tpl(`if (${data}.length > ${itemsLength}) ${error}`);
	    }

	    schema.items.forEach((subSchema, index) => {
	      tpl(`if(${data}.length > ${index}) {`);
	      data.push(`[${index}]`);
	      tpl.visit(subSchema);
	      data.pop();
	      tpl('}');
	    });

	    if (typeof schema.additionalItems === 'object') {
	      const zeroIndex = tpl.cache(itemsLength);
	      const index = tpl.cache(itemsLength);

	      tpl(`for (${zeroIndex}; ${index} < ${data}.length; ${index}++) {`);
	      data.push(`[${tpl.cache(itemsLength)}]`);
	      tpl.visit(schema.additionalItems);
	      data.pop();
	      tpl('}');
	    }
	  } else {
	    const zeroIndex = tpl.cache('0');
	    const index = tpl.cache('0');

	    tpl(`for (${zeroIndex}; ${index} < ${data}.length; ${index}++) {`);
	    data.push(`[${index}]`);
	    tpl.visit(schema.items);
	    data.pop();
	    tpl('}');
	  }
	  tpl('}');
	};

	const { hasProperty: hasProperty$b } = utils;

	var contains = function contains(schema, tpl) {
	  if (!hasProperty$b(schema, 'contains')) {
	    return;
	  }

	  const error = tpl.error('contains');
	  const fn = `${tpl.link(schema.contains)}`;

	  const { data } = tpl;
	  const zeroIndex = tpl.cache('0');
	  const index = tpl.cache('0');
	  const dataAtIndex = data.toString.apply(data.concat(`[${index}]`));

	  tpl(`if (Array.isArray(${data})) {
    if (${data}.length === 0) ${error}
      for (${zeroIndex}; ${index} < ${data}.length; ${index}++) {
        if (!${fn}(${dataAtIndex})) break;
        if (${index} === ${data}.length - 1) ${error}
      }
  }`);
	};

	const { hasProperty: hasProperty$c } = utils;
	const { make: makeSchema } = schema;

	var _const = function constant(schema$$1, tpl) {
	  if (!hasProperty$c(schema$$1, 'const')) {
	    return;
	  }

	  const constantInstanceSchema = makeSchema(schema$$1.const);
	  tpl.visit(constantInstanceSchema);
	};

	const { hasProperty: hasProperty$d } = utils;

	var propertyNames = function propertyNames(schema, tpl) {
	  if (!hasProperty$d(schema, 'propertyNames')) {
	    return;
	  }

	  const fn = tpl.link(schema.propertyNames);
	  const error = tpl.error('propertyNames');

	  tpl(`if (Object.keys(${tpl.data}).some(${fn})) ${error}`);
	};

	/**
	 * @module validators
	 * @description
	 * Contains validators functions links
	 * Provides an information about the order in which validators should be applied
	 * Each validator may return true, which means, others will be ignored
	 * @see $ref
	 */

















	var validators = {
	  name: {
	    $ref,
	    required,
	    format,
	    property,
	    type,
	    not,
	    anyOf,
	    oneOf,
	    allOf,
	    dependencies,
	    properties: properties$1,
	    patternProperties,
	    items,
	    contains,
	    constant: _const,
	    propertyNames,
	  },
	  list: [
	    $ref,
	    required,
	    format,
	    property,
	    type,
	    not,
	    anyOf,
	    oneOf,
	    allOf,
	    dependencies,
	    properties$1,
	    patternProperties,
	    items,
	    contains,
	    _const,
	    propertyNames
	  ]
	};

	/**
	 * @module utils
	 * @description
	 * Utilities to check and normalize uri
	 */
	const REGEXP_URI = /:\/\//;
	const REGEXP_URI_FRAGMENT = /#\/?/;
	const REGEXP_URI_PATH = /(^[^:]+:\/\/[^?#]*\/).*/;

	/**
	 * @name keys
	 * @type {object}
	 * @description
	 * Keys to apply schema attributes & values
	 */
	const keys = {
	  id: '$id',
	};

	/**
	 * @name head
	 * @type {function}
	 * @description
	 * Clean an id from its fragment
	 * @example
	 * head('http://domain.domain:2020/test/a#test')
	 * // returns 'http://domain.domain:2020/test/a'
	 * @param {string} id
	 * @returns {string} cleaned
	 */
	function head(uri) {
	  if (typeof uri !== 'string') {
	    return uri;
	  }

	  const parts = uri.split(REGEXP_URI_FRAGMENT);
	  return parts[0];
	}

	function isFullUri(uri) {
	  return REGEXP_URI.test(uri);
	}

	/**
	 * @name path
	 * @type {function}
	 * @description
	 * Gets a scheme, domain and a path part from the uri
	 * @example
	 * path('http://domain.domain:2020/test/a?test')
	 * // returns 'http://domain.domain:2020/test/'
	 * @param {string} uri
	 * @returns {string} path
	 */
	function path(uri) {
	  return uri.replace(REGEXP_URI_PATH, '$1');
	}

	/**
	 * @description
	 * Get the fragment (#...) part of the uri
	 * @see https://tools.ietf.org/html/rfc3986#section-3
	 * @param {string} uri
	 * @returns {string} fragment
	 */
	function fragment(uri) {
	  if (typeof uri !== 'string') {
	    return uri;
	  }

	  const parts = uri.split(REGEXP_URI_FRAGMENT);
	  return parts[1];
	}

	/**
	 * @name makePath
	 * @type function
	 * @description
	 * Concat parts into single uri
	 * @see https://tools.ietf.org/html/rfc3986#section-3
	 * @param {array<string>} parts
	 * @returns {string} uri
	 */
	function makePath(parts) {
	  return parts
	    .filter(part => typeof part === 'string')
	    .reduce((uri, id) => {
	      // if id is full replace uri
	      if (!uri.length || isFullUri(id)) {
	        return id;
	      }
	      if (!id) {
	        return uri;
	      }

	      // if fragment found
	      if (id.indexOf('#') === 0) {
	        // should replace uri's sharp with id
	        const sharpUriIndex = uri.indexOf('#');
	        if (sharpUriIndex === -1) {
	          return uri + id;
	        }

	        return uri.slice(0, sharpUriIndex) + id;
	      }

	      // get path part of uri
	      // and replace the rest with id
	      const partialUri = path(uri) + id;
	      return partialUri + (partialUri.indexOf('#') === -1 ? '#' : '');
	    }, '');
	}

	/**
	 * @name normalize
	 * @type {function}
	 * @description
	 * Replace json-pointer special symbols in a given uri.
	 * @param {string} uri
	 * @returns {string} normalizedUri
	 */
	function normalize(uri) {
	  return decodeURIComponent(uri.replace(/~1/g, '/').replace(/~0/g, '~'));
	}

	var uri = {
	  makePath,
	  isFullUri,
	  head,
	  fragment,
	  normalize,
	  keys,
	};

	/**
	 * @module state
	 * @description
	 * State module is responsible for scope schemas resolution.
	 * It also exports a main `generate` function.
	 */

	const { list: validators$1 } = validators;
	const { body: body$1, restore: restore$1, template: template$1 } = template_1;
	const { hasProperty: hasProperty$e } = utils;
	const {
	  normalize: normalize$1,
	  makePath: makePath$1,
	  head: head$1,
	  isFullUri: isFullUri$1,
	  fragment: fragment$1,
	  keys: keys$1,
	} = uri;
	const {
	  is: isSchema$1,
	  transform: transformSchema,
	} = schema;

	function State(schema$$1 = {}, env) {
	  Object.assign(this, {
	    context: [],
	    entries: new Map(),
	    env,
	  });
	}

	/**
	 * @name generate
	 * @type {function}
	 * @description
	 * The main schema process function.
	 * Available and used both in external and internal generation.
	 * Saves the state for internal recursive calls.
	 * @param {object} env - djv environment
	 * @param {object} schema - to process
	 * @param {State} state - saved state
	 * @param {Environment} options
	 * @returns {function} restoredFunction
	 */
	function generate(env, schema$$1, state = new State(schema$$1, env), options) {
	  const tpl = template$1(state, options);
	  tpl.visit(schema$$1);

	  const source = body$1(tpl, state, options);
	  return restore$1(source, schema$$1, options);
	}

	State.prototype = Object.assign(Object.create(Array.prototype), {
	  /**
	   * @name addEntry
	   * @type {function}
	   * @description
	   * Generates an internal function.
	   * Usually necessary for `allOf` types of validators.
	   * Caches generated functions by schema object key.
	   * Checks for an existing schema in a context stack to avoid double parsing and generation.
	   * @param {string} url
	   * @param {object} schema
	   * @returns {number/boolean} index
	   */
	  addEntry(url, schema$$1) {
	    let entry = this.entries.get(schema$$1);
	    if (entry === false) {
	      // has already been added to process queue
	      // will be revealed as an entry
	      return this.context.push(schema$$1);
	    }

	    if (typeof entry === 'undefined') {
	      // start to process schema
	      this.entries.set(schema$$1, false);
	      entry = generate(this.env, schema$$1, this, { inner: true });
	      this.entries.set(schema$$1, entry);
	      this.revealReference(schema$$1);
	    }

	    return this.context.push(entry);
	  },
	  /**
	   * @name revealReference
	   * @type {function}
	   * @description
	   * If a schema was added during the add entry phase
	   * Then it should be revealed in this step
	   * @param {object} schema
	   * @returns {void}
	   */
	  revealReference(schema$$1) {
	    for (
	      let doubled = this.context.indexOf(schema$$1);
	      doubled !== -1;
	      doubled = this.context.indexOf(schema$$1)
	    ) {
	      this.context[doubled] = this.context.length;
	    }
	  },
	  /**
	   * @name link
	   * @type {function}
	   * @description
	   * Returns an entry's index in a context stack.
	   * @param {string} url
	   * @returns {string} entry
	   */
	  link(url) {
	    const schema$$1 = this.resolve(url);
	    const entry = this.addEntry(url, schema$$1);
	    return entry;
	  },
	  /**
	   * @name resolveReference
	   * @type {function}
	   * @description
	   * Resolve reference against the stack.
	   * @param {string} reference
	   * @returns {string} resolvedReference
	   */
	  resolveReference(reference) {
	    if (isFullUri$1(reference)) {
	      return reference;
	    }

	    // find last full URI schema
	    let lastFullURIReference;
	    let lastFullURISchemaIndex;

	    for (let i = this.length - 1; i >= 0; i -= 1, lastFullURIReference = false) {
	      const { [keys$1.id]: id, $ref } = this[i];
	      lastFullURIReference = id || $ref;
	      if (isFullUri$1(lastFullURIReference)) {
	        lastFullURISchemaIndex = i;
	        break;
	      }
	    }

	    // collect all partial routes for it
	    const partialReferences = [];
	    for (let i = this.length - 1; i > lastFullURISchemaIndex; i -= 1) {
	      const { [keys$1.id]: id, $ref } = this[i];
	      const partialReference = id || $ref;
	      if (head$1(partialReference)) {
	        partialReferences.push(partialReference);
	      }
	    }

	    // attach reference and make path
	    const path = makePath$1([lastFullURIReference, ...partialReferences, reference]);
	    return path;
	  },
	  /**
	   * @name ascend
	   * @private
	   * @type {function}
	   * @description
	   * Search for a parent schema by reference.
	   * Iterates over the chain of schemas.
	   * @param {string} reference
	   * @returns {object} parentSchema
	   */
	  ascend(reference) {
	    const path = head$1(reference);
	    let { schema: parentSchema = this[0] } = this.env.resolved[path] || {};

	    // Search while it is a full schema, not a ref
	    while (
	      parentSchema.$ref &&
	      // avoid infinite loop
	      head$1(parentSchema.$ref) !== head$1(reference) &&
	      // > All other properties in a "$ref" object MUST be ignored.
	      // @see https://tools.ietf.org/html/draft-wright-json-schema-01#section-8
	      Object.keys(parentSchema).length === 1
	    ) {
	      parentSchema = this.ascend(parentSchema.$ref);
	    }

	    return parentSchema;
	  },
	  /**
	   * @name descend
	   * @private
	   * @type {function}
	   * @description
	   * Search for a child schema by reference.
	   * Iterates over the chain of schemas.
	   * @param {string} reference
	   * @returns {object} currentSchema
	   */
	  descend(reference, parentSchema) {
	    let uriFragment = fragment$1(reference);
	    if (!uriFragment && isFullUri$1(reference)) {
	      return parentSchema;
	    }

	    if (!uriFragment) {
	      uriFragment = reference;
	    }

	    const parts = uriFragment.split('/');
	    const currentSchema = parts
	      .map(normalize$1)
	      .reduce((schema$$1, part, index) => {
	        let subSchema = schema$$1[part];
	        if (!isSchema$1(subSchema)) {
	          subSchema = schema$$1.definitions && schema$$1.definitions[part];
	        }

	        if (
	          // last will be pushed on visit
	          // @see /draft4/refRemote.json:http://localhost:1234/scope_change_defs2.json
	          index !== parts.length - 1 &&
	          hasProperty$e(subSchema, keys$1.id)
	        ) {
	          this.push(subSchema);
	        }

	        return subSchema;
	      }, parentSchema);

	    return isSchema$1(currentSchema) ? currentSchema : parentSchema;
	  },
	  /**
	   * @name resolve
	   * @type {function}
	   * @description
	   * Resolves schema by given reference and current registered context stack.
	   * @param {string} url
	   * @returns {object} schema
	   */
	  resolve(reference) {
	    if (typeof reference !== 'string') {
	      return reference;
	    }

	    const fullReference = this.resolveReference(reference);
	    const parentSchema = this.ascend(fullReference);
	    const subSchema = this.descend(reference, parentSchema);

	    return subSchema;
	  },
	  /**
	   * @name visit
	   * @type {function}
	   * @description
	   * Calls each registered validator with given schema and template instance.
	   * Validator may or may not add code to generated validator function.
	   * @param {object} pseudoSchema
	   * @param {object} tpl
	   * @returns {void}
	   */
	  visit(pseudoSchema, tpl) {
	    const schema$$1 = transformSchema(pseudoSchema);
	    const initialLength = this.length;
	    this.push(schema$$1);

	    validators$1.some(validator => (
	      validator(schema$$1, tpl)
	    ));

	    this.length = initialLength;
	  },
	});

	var state = {
	  State,
	  generate,
	};

	/**
	 * @module environment
	 * @description
	 * Update the given environment
	 */




	const { keys: keys$2 } = uri;
	const { transformation: transformation$1 } = schema;

	const environmentConfig = {};

	function add(version, config) {
	  environmentConfig[version] = config;
	}

	function use(version) {
	  if (!version || !environmentConfig[version]) {
	    return;
	  }

	  const patchEnvironment = environmentConfig[version];
	  patchEnvironment({
	    properties,
	    keywords,
	    validators,
	    formats,
	    keys: keys$2,
	    transformation: transformation$1,
	  });
	}

	var environment = {
	  add,
	  use,
	};

	/* eslint no-param-reassign: [2, { "props": false }] */
	const djvDraft04 = ({
	  properties,
	  keywords,
	  validators,
	  formats,
	  keys,
	  transformation,
	}) => {
	  Object.assign(properties, {
	    minimum(schema) {
	      return `%s <${schema.exclusiveMinimum ? '=' : ''} ${schema.minimum}`;
	    },
	    maximum(schema) {
	      return `%s >${schema.exclusiveMaximum ? '=' : ''} ${schema.maximum}`;
	    },
	  });

	  delete properties.exclusiveMaximum;
	  delete properties.exclusiveMinimum;

	  ['$id', 'contains', 'const', 'examples'].forEach((key) => {
	    const index = keywords.indexOf(key);
	    if (index === -1) {
	      return;
	    }

	    keywords.splice(index, 1);
	  });

	  if (keywords.indexOf('exclusiveMaximum') === -1) {
	    keywords.push('exclusiveMaximum', 'exclusiveMininum', 'id');
	  }

	  ['contains', 'constant', 'propertyNames'].forEach((key) => {
	    const validator = validators.name[key];
	    delete validators.name[key];

	    const index = validators.list.indexOf(validator);
	    if (index === -1) {
	      return;
	    }

	    validators.list.splice(index, 1);
	  });

	  delete formats['json-pointer'];
	  delete formats['uri-reference'];
	  delete formats['uri-template'];

	  Object.assign(keys, { id: 'id' });
	  Object.assign(transformation, {
	    ANY_SCHEMA: true,
	    NOT_ANY_SCHEMA: false,
	  });
	};

	var djvDraft04_1 = djvDraft04;

	const { restore: restore$2, expression: expression$1 } = template_1;

	const { generate: generate$1, State: State$1 } = state;
	const { add: add$1, use: use$1 } = environment;

	/**
	 * Configuration for template
	 * @typedef {object} DjvConfig
	 * @property {string?} version - defines which version of json-schema draft to use,
	 * draft-04 by default
	 * @property {function?} versionConfigure - handler to apply for environment version
	 * @property {boolean?} inner - a generating object should be considered as inner
	 * Default value is false/undefined.
	 * If true, then it avoid creating variables in a generated function body,
	 * however without proper wrapper function approach will not work.
	 * @see template/body, template/body
	 * @property {object?} formats - an object containing list of formatters to add for environment
	 * @property {function?} errorHandler - a handler to use for generating custom error messages
	 */

	/**
	 * @name Environment
	 * @description
	 * Key constructor used for creating enivornment instance
	 * @type {function} constructor
	 * @param {DjvConfig} options passed to templater and utilities
	 *
	 * Usage
	 *
	 * ```javascript
	 * const env = djv();
	 * const env = new djv();
	 * const env = new djv({ errorHandler: () => ';' });
	 * ```
	 */
	function Environment(options = {}) {
	  if (!(this instanceof Environment)) { return new Environment(options); }

	  this.options = options;
	  this.resolved = {};
	  this.state = new State$1(null, this);

	  this.useVersion(options.version, options.versionConfigure);
	  this.addFormat(options.formats);
	}

	Object.assign(Environment, {
	  expression: expression$1,
	});

	Object.assign(Environment.prototype, {
	  /**
	   * check if object correspond to schema
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.validate('test#/common', { type: 'common' });
	   * // => undefined
	   *
	   * env.validate('test#/common', { type: 'custom' });
	   * // => 'required: data'
	   *
	   * @param {string} name
	   * @param {object} object
	   * @returns {string} error - undefined if it is valid
	   */
	  validate(name, object) {
	    return this.resolve(name).fn(object);
	  },

	  /**
	   * add schema to djv environment
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.addSchema('test', jsonSchema);
	   * ```
	   *
	   * @param {string?} name
	   * @param {object} schema
	   * @param {object} schema
	   * @returns {resolved}
	   */
	  addSchema(name, schema) {
	    const realSchema = typeof name === 'object' ? name : schema;
	    const resolved = {
	      schema: realSchema,
	      fn: generate$1(this, realSchema, undefined, this.options),
	    };

	    [name, schema.id]
	      .filter(id => typeof id === 'string')
	      .forEach((id) => {
	        this.resolved[id] = Object.assign({ name: id }, resolved);
	      });

	    return resolved;
	  },

	  /**
	   * removes a schema or the whole structure from djv environment
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.removeSchema('test');
	   * ```
	   *
	   * @param {string} name
	   */
	  removeSchema(name) {
	    if (name) {
	      delete this.resolved[name];
	    } else {
	      this.resolved = {};
	    }
	  },

	  /**
	   * resolves name by existing environment
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.resolve('test');
	   * // => { name: 'test', schema: {} }, fn: ... }
	   * ```
	   *
	   * @param {string} name
	   * @returns {resolved}
	   */
	  resolve(name) {
	    if (typeof name === 'object' || !this.resolved[name]) {
	      return this.addSchema(
	        name,
	        this.state.resolve(name)
	      );
	    }

	    return this.resolved[name];
	  },

	  /**
	   * exports the whole structure object from environment or by resolved name
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.export();
	   * // => { test: { name: 'test', schema: {}, ... } }
	   * ```
	   *
	   * @param {string} name
	   * @returns {serializedInternalState}
	   */
	  export(name) {
	    let resolved;
	    if (name) {
	      resolved = this.resolve(name);
	      resolved = {
	        name,
	        schema: resolved.schema,
	        fn: resolved.fn.toString()
	      };
	    } else {
	      resolved = {};
	      Object.keys(this.resolved).forEach((key) => {
	        resolved[key] = {
	          name: key,
	          schema: this.resolved[key].schema,
	          fn: this.resolved[key].fn.toString()
	        };
	      });
	    }

	    return JSON.stringify(resolved);
	  },

	  /**
	   * imports all found structure objects to internal environment structure
	   * Usage
	   *
	   * ```javascript
	   * env.import(config);
	   * ```
	   *
	   * @param {object} config - internal structure or only resolved schema object
	   */
	  import(config) {
	    const item = JSON.parse(config);
	    let restoreData = item;
	    if (item.name && item.fn && item.schema) {
	      restoreData = { [item.name]: item };
	    }

	    Object.keys(restoreData).forEach((key) => {
	      const { name, schema, fn: source } = restoreData[key];
	      const fn = restore$2(source, schema, this.options);
	      this.resolved[name] = { name, schema, fn };
	    });
	  },

	  /**
	   * @name addFormat
	   * @type function
	   * @description
	   * Add formatter to djv environment.
	   * When a string is passed it is interpreted as an expression which
	   * when returns `true` goes with an error, when returns `false` then a property is valid.
	   * When a function is passed it will be executed during schema compilation
	   * with a current schema and template helper arguments.
	   * @see utils/formats
	   *
	   * Usage
	   *
	   * ```javascript
	   * env.addFormat('UpperCase', '%s !== %s.toUpperCase()');
	   * // or
	   * env.addFormat('isOk', function(schema, tpl){
	   *   return `!${schema.isOk} || %s !== %s.toUpperCase()`;
	   * });
	   * ```
	   *
	   * @param {string/object?} name
	   * @param {string/function} formatter
	   */
	  addFormat(name, formatter) {
	    if (typeof name === 'string') {
	      formats[name] = formatter;
	      return;
	    }

	    if (typeof name === 'object') {
	      Object.assign(formats, name);
	    }
	  },

	  /**
	   * @name setErrorHandler
	   * @type function
	   * @description
	   * Specify custom error handler which will be used in generated functions when problem found.
	   * The function should return a string expression, which will be executed when generated
	   * validator function is executed. The simpliest use case is the default one
	   * @see template/defaultErrorHandler
	   * ```javascript
	   *  function defaultErrorHandler(errorType) {
	   *    return `return "${errorType}: ${tpl.data}";`;
	   *  }
	   * ```
	   * It returns an expression 'return ...', so the output is an error string.
	   * Usage
	   * ```javascript
	   * djv({ errorHandler: () => 'return { error: true };' }) // => returns an object
	   * djv({
	   *  errorHandler: function customErrorHandler(errorType, property) {
	   *    return `errors.push({
	   *      type: "${errorType}",
	   *      schema: "${this.schema[this.schema.length - 1]}",
	   *      data: "${this.data[this.data.length - 1]}"
	   *    });`;
	   *  }
	   * });
	   * ```
	   * When a custom error handler is used, the template body function adds a `error` variable inside
	   * a generated validator, which can be used to put error information. `errorType` is always
	   * passed to error handler function. Some validate utilities put extra argument, like f.e.
	   * currently processed property value. Inside the handler context is a templater instance,
	   * which contains `this.schema`, `this.data` paths arrays to identify validator position.
	   * @see test/index/setErrorHandler for more examples
	   * @param {function} errorHandler - a function called each time compiler creates an error branch
	   * @returns void
	   */
	  setErrorHandler(errorHandler) {
	    Object.assign(this.options, { errorHandler });
	  },
	  /**
	  * @name useVersion
	  * @type {function}
	  * @description
	  * Add a specification version for environment
	  * A configure function is called with exposed environments, like keys, formats, etc.
	  * Updates internals utilities and configurations to fix versions implementation conflicts
	  * @param {string} version of json-schema specification to use
	  * @param {function} configure
	  * @returns void
	  */
	  useVersion(version, configure) {
	    if (typeof configure !== 'function' && version === 'draft-04') {
	      /* eslint-disable no-param-reassign, global-require, import/no-extraneous-dependencies */
	      configure = djvDraft04_1;
	      /* eslint-enable no-param-reassign, global-require, import/no-extraneous-dependencies */
	    }
	    if (typeof configure === 'function') {
	      add$1(version, configure);
	    }
	    use$1(version);
	  },
	});

	var djv = Environment;

	var types$1 = {
		"null": {"type": "null"},
		"brep_format": {
			"enum": ["x_b", "x_t", "iges", "step", "sat", "sab", "stl", "3dm"]
		},
		"index": {
			"type": "integer",
			"minimum": 0
		},
		"indexNonzero": {
			"type": "integer",
			"exclusiveMinimum": 0
		},
		"direction": {
			"type": "array",
			"items": { "type": "number" },
			"minItems": 3,
			"maxItems": 3
		},
		"unitNumber": {
			"type": "number",
			"minimum": 0,
			"maximum": 1
		},
		"redbackid": {
			"type": "string"
		},
		"angle": {
			"type": "number",
			"redbackDimension": "angle"
		},
		"coordinate": {
			"type": "number",
			"redbackDimension": "length"
		},
		"distance": {
			"type": "number",
			"minimum": 0,
			"redbackDimension": "length"
		},
		"area": {
			"type": "number",
			"minimum": 0,
			"redbackDimension": "area"
		},
		"volume": {
			"type": "number",
			"minimum": 0,
			"redbackDimension": "volume"
		},
		"distanceNonzero": {
			"type": "number",
			"exclusiveMinimum": 0,
			"redbackDimension": "length"
		},
		"position": {
			"type": "array",
			"items": {
				"type": "number",
				"dimension": "length"
			},
			"minItems": 3,
			"maxItems": 3
		},
		"dimensions": {
	        "type": "array",
	        "items": {
	        	"type": "number",
	            "exclusiveMinimum": 0,
	            "dimension": "length"
	        },
	        "minItems": 3,
	        "maxItems": 3
	    },
	    "units": {
	    	"type": "object",
	    	"additionalProperties": false,
	    	"patternProperties": {
	    		".*": {"type": "string"}
	    	}
	    },
	    "matrix": {
	    	"type": "array",
	    	"items": {"type": "number"},
	    	"minItems": 3,
	    	"maxItems": 3
	    },
	    "uv": {
	    	"type": "array",
	    	"items": {"type": "number"},
	    	"minItems": 2,
	    	"maxItems": 2
	    }
	};

	var moreEntities = {
		"line": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["line"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"start": 			{"$ref": types$1.position},
				"end": 				{"$ref": types$1.position}
			},
			"required": ["primitive", "start", "end"]
		},
		"polyline": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["polyline"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"points": {
					"type": "array",
					"items": {"$ref": types$1.position},
					"minItems": 2
				}
			},
			"required": ["primitive", "points"]
		},
	    "curve": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["curve"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"degree": 			{"$ref": types$1.indexNonzero},
				"controlPoints": 	{"type": "array", "items": {"$ref": types$1.position}},
				"knots": 			{"type": "array", "items": {"type": "number"}},
				"weights": 			{"type": "array", "items": {"type": "number"}}
			},
			"required": ["primitive", "degree", "controlPoints", "knots"]
		},
		"arc": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["arc"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"start": 			{"$ref": types$1.position},
				"middle": 			{"$ref": types$1.position},
				"end": 				{"$ref": types$1.position}
			},
			"required": ["primitive", "start", "middle", "end"]
		},
		"surface": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["surface"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.indexNonzero},
				"uDegree": 			{"$ref": types$1.indexNonzero},
				"vDegree": 			{"$ref": types$1.indexNonzero},
				"uKnots": 			{"type": "array", "items": {"type": "number"}},
				"vKnots": 			{"type": "array", "items": {"type": "number"}},
				"controlPoints": {
					"type": "array",
					"items": {
						"type": "array",
						"items": {
							"$ref": types$1.position
						}
					}
				},
				"weights": 			{"type": "array", "items": {"type": "number"}}
			},
			"required": ["primitive", "uDegree", "vDegree", "uKnots", "vKnots", "controlPoints"]
		}
	};

	var geometry = {
		"brep": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["brep"]},
				"content": 			{"type": "string"},
				"format": 			{"$ref": types$1.brep_format},
				"isCompressed": 	{"type": "boolean"},
				"isBase64": 		{"type": "boolean"},
				"attributes": 		{"type": "object"}
			},
			"required": ["primitive", "content", "format"]
		},
		"vector": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["vector"]},
				"attributes":  		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"coords": 			{"$ref": types$1.position}
			},
			"required": ["primitive", "coords"]
		},
		"point": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["point"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"point": 			{"$ref": types$1.position}
			},
			"required": ["primitive", "point"]
		},
		"plane": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["plane"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"normal": 			{"$ref": types$1.direction}
			},
			"required": ["primitive", "origin", "normal"]
		},
		"line": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["line"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"start": 			{"$ref": types$1.position},
				"end": 				{"$ref": types$1.position}
			},
			"required": ["primitive", "start", "end"]
		},
		"polyline": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["polyline"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"points": {
					"type": "array",
					"items": {"$ref": types$1.position},
					"minItems": 2
				}
			},
			"required": ["primitive", "points"]
		},
		"circle": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["circle"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"radius": 			{"$ref": types$1.distanceNonzero},
				"axis": 			{"$ref": types$1.direction}
			},
			"required": ["primitive", "origin", "radius"]
		},
		"ellipse": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["ellipse"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"majorRadius": 		{"$ref": types$1.distanceNonzero},
				"minorRadius": 		{"$ref": types$1.distanceNonzero},
				"axis": 			{"$ref": types$1.direction},
				"reference": 		{"$ref": types$1.direction}
			},
			"required": ["primitive", "origin", "majorRadius", "minorRadius"]
		},
		"curve": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["curve"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"degree": 			{"$ref": types$1.indexNonzero},
				"controlPoints": 	{"type": "array", "items": {"$ref": types$1.position}},
				"knots": 			{"type": "array", "items": {"type": "number"}},
				"weights": 			{"type": "array", "items": {"type": "number"}}
			},
			"required": ["primitive", "degree", "controlPoints", "knots"]
		},
		"arc": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["arc"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"start": 			{"$ref": types$1.position},
				"middle": 			{"$ref": types$1.position},
				"end": 				{"$ref": types$1.position}
			},
			"required": ["primitive", "start", "middle", "end"]
		},
		"rectangle": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["rectangle"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"dimensions": {
					"type": "array",
					"items": 		{"$ref": types$1.distanceNonzero},
					"minItems": 2,
					"maxItems": 2,
					"additionalItems": false
				},
				"axis": 			{"$ref": types$1.direction},
				"reference": 		{"$ref": types$1.direction}
			},
			"required": ["primitive", "origin", "dimensions"]
		},
		"polycurve": {
			"type": "object",
			"properties": {
				"id": {"$ref": types$1.redbackid},
				"primitive": {"enum": ["polycurve"]},
				"attributes": {"type": "object"},
				"curves": {
					"type": "array",
					"minItems": 1,
					"items": {
						"oneOf": [
							{"$ref": moreEntities.line},
							{"$ref": moreEntities.polyline},
							{"$ref": moreEntities.curve},
							{"$ref": moreEntities.arc}
						]
					}
				}
			},
			"required": ["primitive", "curves"]
		},
		"surface": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["surface"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.indexNonzero},
				"uDegree": 			{"$ref": types$1.indexNonzero},
				"vDegree": 			{"$ref": types$1.indexNonzero},
				"uKnots": 			{"type": "array", "items": {"type": "number"}},
				"vKnots": 			{"type": "array", "items": {"type": "number"}},
				"controlPoints": {
					"type": "array",
					"items": {
						"type": "array",
						"items": {
							"$ref": types$1.position
						}
					}
				},
				"weights": 			{"type": "array", "items": {"type": "number"}}
			},
			"required": ["primitive", "uDegree", "vDegree", "uKnots", "vKnots", "controlPoints"]
		},
		"polysurface": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["polysurface"]},
				"attributes": 		{"type": "object"},
				"surfaces": {
					"type": "array",
					"items": {"oneOf": [
						{"$ref": moreEntities.surface}
					]},
					"minItems": 1
				}
			},
			"required": ["primitive", "surfaces"]
		},
		"block": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["block"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"dimensions": 		{"$ref": types$1.dimensions},
				"axis": 			{"$ref": types$1.direction},
				"reference": 		{"$ref": types$1.direction}
			},
			"required": ["primitive", "origin", "dimensions"]
		},
		"sphere": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["sphere"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"origin": 			{"$ref": types$1.position},
				"radius": 			{"$ref": types$1.distanceNonzero}
			},
			"required": ["primitive", "origin", "radius"],
			"additionalProperties": false
		},
		"mesh": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["mesh"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"vertices": {
					"type": "array",
					"items": 		{"$ref": types$1.position}
				},
				"faces": {
					"type": "array",
					"items": {
						"type": "array",
						"items": 	{"$ref": types$1.index},
						"minItems": 3
					}
				},
				// per vertex
				"color": {
					"type": "array",
					"items": 		{"$ref": types$1.direction}
				},
				"normal": {
					"type": "array",
					"items": 		{"$ref": types$1.direction}
				},
				"uv": {
					"type": "array",
					"items": 		{"$ref": types$1.uv}
				},
				"isSolid": {"type": "boolean"}
			},
			"required": ["primitive", "vertices", "faces"]
		},
		"text": {
			"type": "object",
			"properties": {
				"id": 				{"$ref": types$1.redbackid},
				"primitive": 		{"enum": ["text"]},
				"attributes": 		{"type": "object"},
				"units": 			{"$ref": types$1.units},
				"align": 			{"$ref": types$1.position},
				"origin": 			{"$ref": types$1.position},
				"direction": 		{"$ref": types$1.direction},
				"size": 			{"type": "number"},
				"color": 			{"type": "color"},
				"text": 			{"type": "string"}
			},
			"required": ["primitive", "size", "text"]
		}
	};

	// validator.js

	const env = new djv({version: 'draft-06'});

	function Validator() {
		// console.log(env)
		console.log('the answer is ' + index);

		env.addSchema('test', geometry);

		// console.log("SCHEMA")
		// console.log(schema.geometry)

	 //    var test = env.validate('test#/block', nonBlock);

	 //    if(typeof test === 'undefined') {
		// 	console.log("VALID");
		// } else {
		// 	console.log("NOT VALID");
		// }
		
	}


	function generateChecker(data) {

		// env.addSchema('test', schema.geometry);
		console.log(env);

		var test = env.validate('test#/sphere', data);
		console.log(test);
		// console.log("NEW SCHEMA")

		if(typeof test === 'undefined') {
			console.log("test VALID");
		} else {
			console.log("test NOT VALID");
		}

	}

	// sceneBuilder.js

	function SceneBuilder() {
		console.log("SCENEBUILDER");	
	}

	SceneBuilder.prototype.convert = function(data) {
		console.log("SceneBuilder Data");
		console.log(data);

		generateChecker(data);
	};

	// viewport.js

	function Viewport(domParent) {
		var valid = new Validator();

		var foo = new HelloWorld();

		var renderWidth = domParent.clientWidth;
		var renderHeight = domParent.clientHeight;

		var renderer = new Renderer(domParent, renderWidth, renderHeight);
		domParent.appendChild( renderer.renderer.domElement );

		window.addEventListener("keypress", myEventHandler, false);

		this._validator = new Validator();

		this._sceneBuilder = new SceneBuilder();

	}

	// Obtain json and convert to json object
	Viewport.prototype.setGeometryJson = function(dataString) {
		var dataObj = JSON.parse(JSON.stringify(dataString));

		this.setGeometryEntity(dataObj);
	};

	Viewport.prototype.setGeometryEntity = function(data) {
		return new Promise((resolve, reject) => {
			if(this.running) {
				reject(new Error("REJECT"));
			}
			console.log("ACCEPT");
			this._sceneBuilder.convert(data);
		})
	};

	function myEventHandler(e) {
		var keyCode = e.keyCode;
		console.log(keyCode);
		if(keyCode == 115) {
			console.log("SAVEEEEEEEEEEEEEEED");
		} else {
			console.log("I am a letter");
		}
	}

	// index.js ENTRY POINT

	return Viewport;

}(THREE));
