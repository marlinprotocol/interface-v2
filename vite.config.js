import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
    // optimizeDeps: {
    // 	esbuildOptions: {
    // 		plugins: [
    // 			NodeModulesPolyfillPlugin(),
    // 			NodeGlobalsPolyfillPlugin({
    // 				process: true,
    // 				buffer: true
    // 			})
    // 		],
    // 		define: {
    // 			global: 'globalThis'
    // 		}
    // 	}
    // }
});
//# sourceMappingURL=vite.config.js.map