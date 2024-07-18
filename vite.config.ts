import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import inject from '@rollup/plugin-inject';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const MODE: 'prod' | 'development' = 'prod'; // change mode to development if using npm run preview for checking the build locally
const development: boolean = (MODE as string) === 'development';

export default defineConfig({
	plugins: [
		sveltekit(),
		development &&
			nodePolyfills({
				include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js'), 'http', 'process']
			})
	],
	resolve: {
		alias: {
			process: 'process/browser',
			crypto: 'crypto-browserify',
			stream: 'stream-browserify',
			assert: 'assert',
			buffer: 'buffer'
		}
	},
	build: {
		rollupOptions: {
			external: ['@web3-onboard/*'],
			plugins: [
				nodePolyfills({ include: ['crypto', 'http'] }),
				inject({ Buffer: ['buffer', 'Buffer'] })
			]
		},
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},
	optimizeDeps: {
		exclude: ['@ethersproject/hash', 'wrtc', 'http'],
		include: ['@web3-onboard/core', 'js-sha3', '@ethersproject/bignumber'],
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			}
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		coverage: {
			provider: 'v8',
			enabled: true
		},
		reporters: ['html', 'default', 'json-summary', 'json']
	}
});
