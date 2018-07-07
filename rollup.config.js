// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/index.js',
	external: ['three'],
	output: {
		file: 'build/viewport-bundle.js',
		format: 'iife',
		name: 'Viewport',
		globals: {
			three: 'THREE'
		}
	},
	plugins: [
		nodeResolve(),
		commonjs({
			ignoreGlobal: true
		})
	]
}
