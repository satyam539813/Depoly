import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1600,
    copyPublicDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  },
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.gltf'],
  publicDir: 'public',
}) 