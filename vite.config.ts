import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	mode: process.env.MODE || 'mainnet',
	plugins: [sveltekit()]
};

export default config;
