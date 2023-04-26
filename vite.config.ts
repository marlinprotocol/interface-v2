import { sveltekit } from '@sveltejs/kit/vite';
import inject from '@rollup/plugin-inject';

import type { UserConfig } from 'vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const MODE = 'prod'; // change mode to development if using npm run dev //prod
const development = MODE === 'development';

/** @type {import('@sveltejs/kit').Config} */

const config: UserConfig = {
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
	}
};

export default config;
