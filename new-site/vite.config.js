import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

export default defineConfig({
  base: '/',
  plugins: [react(), {
    name: 'mms-page-navigation',
    transformIndexHtml() {
      return [{ tag: 'script', children: readFileSync(new URL('./src/page-navigation.js', import.meta.url), 'utf8'), injectTo: 'head' }];
    },
  }],
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
  build: { rolldownOptions: { input: Object.fromEntries(['index', 'offerings', 'about', 'employment', 'contact'].map(name => [name, resolve(import.meta.dirname, `${name}.html`)])) } },
});
