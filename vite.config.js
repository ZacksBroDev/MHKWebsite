import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' 
          ? 'http://mhk-backend:3001' 
          : 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    // Optimize chunk sizes to prevent large bundles
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for node_modules
          if (id.includes('node_modules')) {
            // Split React ecosystem into separate chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Other vendor libraries
            return 'vendor';
          }
          
          // UI components chunk
          if (id.includes('/ui/')) {
            return 'ui-components';
          }
          
          // Layout components chunk
          if (id.includes('/layout/')) {
            return 'layout';
          }
          
          // Auth related code
          if (id.includes('/auth/') || id.includes('AuthContext')) {
            return 'auth';
          }
          
          // Admin related code
          if (id.includes('/admin/')) {
            return 'admin';
          }
          
          // Fighting style pages
          if (id.includes('/fightStyle/')) {
            return 'fight-styles';
          }
        }
      }
    },
    // Increase chunk size warning limit to 1MB (default is 500kb)
    chunkSizeWarningLimit: 1000
  }
})
