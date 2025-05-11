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
    environment: 'jsdom',
    coverage: {
        provider: 'v8', // Use v8 for coverage
        reporter: ['text', 'html'], // Output coverage in text and HTML formats
        include: ['src/**/*.ts'], // Include TypeScript source files
        exclude: ['node_modules', '*.test.ts'], // Exclude unnecessary files
    },
  }
});