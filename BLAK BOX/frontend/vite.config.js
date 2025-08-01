// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/blakbox': {
        target: 'https://awd-22406-team-3-syntax-squad.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
