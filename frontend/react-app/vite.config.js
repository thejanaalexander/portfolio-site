import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — separate from app code for better caching
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
        }
      }
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 600,
    // Minify with terser for smaller bundles
    target: 'es2015',
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
})
