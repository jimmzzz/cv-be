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
      input: './src/index.ts', // Specify your server entry point here
    },
  },
});