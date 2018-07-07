// gridHelper.js

import * as THREE from 'three';

export default function GridHelper(size, divisions) {
	var gridHelper = new THREE.GridHelper(size, divisions);

	return gridHelper;
}