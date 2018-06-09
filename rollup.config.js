// rollup.config.js

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
	}
}
