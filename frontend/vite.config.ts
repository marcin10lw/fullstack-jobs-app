import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  base: 'https://marcin10lw.github.io/',
  resolve: {
    alias: {
      src: '/src',
    },
  },
});
