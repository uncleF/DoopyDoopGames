import adapter from 'svelte-adapter-github';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path === '/not-found') {
						return;
				}
				throw new Error(message);
			}
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			domain: 'https://doopydoop.com',
			strict: true,
		})
	}
};

export default config;
