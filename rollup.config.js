// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/index.js',
	external: ['three'],
	output: {
		file: 'build/viewport-bundle.js',
		format: 'iife',
		name: 'Viewport',
		globals: {
			THREE: 'THREE'
		}
	},
	plugins: [
		resolve({ jsnext: true}),
		commonjs({
			include: [
				'node_modules/three/**'
			]
			// exclude: [
			// 	'**/three/**'
			// ],
			// namedExports: {'/node_modules/three/build/three.min.js':['THREE']}
		})
	]
}