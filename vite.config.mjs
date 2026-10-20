import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages serves the production build from /react-chords/, while the
  // local development server should behave like a normal root-based app.
  base: process.env.NODE_ENV === 'production' ? '/react-chords/' : '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  server: {
    port: 3000
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true
  }
});
