import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const sourceRoot = path.join(projectRoot, 'src');

function sourceEntries(directory, relativeDirectory = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);

    if (entry.isDirectory()) {
      return sourceEntries(absolutePath, relativePath);
    }

    if (!['.js', '.jsx'].includes(path.extname(entry.name))) {
      return [];
    }

    const entryName = relativePath.slice(0, -path.extname(entry.name).length);
    return [[entryName, absolutePath]];
  });
}

const entries = Object.fromEntries(sourceEntries(sourceRoot));

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  build: {
    outDir: 'lib',
    emptyOutDir: true,
    lib: {
      entry: entries,
      formats: ['es']
    },
    rollupOptions: {
      external: id => id === 'prop-types' || id === 'react' || id === 'react-dom' || id.startsWith('react/'),
      output: {
        preserveModules: true,
        preserveModulesRoot: sourceRoot,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js'
      }
    }
  }
});
