import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
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
			external: ['@web3-onboard/*']
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
		exclude: [
			'build/**',
			'test/**',
			'**/*.cjs',
			'*.{config,cjs,ts}',
			'.svelte-kit/**',
			'src/.svelte-kit/**',
			'.husky/**',
			'html/assets/**',
			'src/lib/utils/services/**',
			'src/routes/**',
			'src/lib/utils/**',
			'src/**/*.svelte',
			'src/lib/controllers/**',
			'interface-v2/**',
			'svelte.config.js'
		],
		environment: 'jsdom',
		globals: true,
		coverage: {
			provider: 'v8',
			enabled: true,
			exclude: [
				'build/**',
				'test/**',
				'**/*.cjs',
				'*.{config,cjs,ts}',
				'.svelte-kit/**',
				'src/.svelte-kit/**',
				'.husky/**',
				'html/assets/**',
				'src/lib/utils/services/**',
				'src/routes/**',
				'src/lib/utils/**',
				'src/**/*.svelte',
				'src/lib/controllers/**',
				'interface-v2/**',
				'svelte.config.js'
			]
		},
		reporters: ['html', 'default']
	}
});
