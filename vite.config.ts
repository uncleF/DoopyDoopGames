import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
    alias: {
      styles: path.resolve('./src/styles'),
      components: path.resolve('./src/components'),
      config: path.resolve('./src/config'),
      data: path.resolve('./src/data'),
      routes: path.resolve('./src/routes'),
      state: path.resolve('./src/state'),
      utilities: path.resolve('./src/utilities'),
      types: path.resolve('./src/types'),
    }
  }
});
