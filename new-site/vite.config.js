import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  plugins: [react()],
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
  build: { rolldownOptions: { input: Object.fromEntries(['index', 'offerings', 'about', 'employment', 'contact'].map(name => [name, resolve(import.meta.dirname, `${name}.html`)])) } },
});
