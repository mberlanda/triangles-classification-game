import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  plugins: [preact()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
});