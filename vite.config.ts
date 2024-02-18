import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://marcin10lw.github.io/fullstack-jobs-app',
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
