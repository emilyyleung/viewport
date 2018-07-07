// axisHelper.js

import * as THREE from 'three';

export default function AxisHelper(size) {
	var axesHelper = new THREE.AxesHelper(size);

	return axesHelper;
}