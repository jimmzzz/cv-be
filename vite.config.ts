import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true,
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: './api/index.ts', // Specify your server entry point here
      output: {
        // Output format as ES module
        format: 'es',
        // Specify the file extension for chunks
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name].mjs',
        assetFileNames: '[name].[ext]'
      }
    },
  },
});