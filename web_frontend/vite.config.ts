import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for React + TypeScript.
 * - Binds dev server and preview to 0.0.0.0 on port 3000 for the preview system.
 * - Includes @vitejs/plugin-react for React Fast Refresh and TSX support.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    // host: true tells Vite to listen on all addresses (0.0.0.0)
    host: true,
    port: 3000,
    strictPort: true
  },
  preview: {
    host: true,
    port: 3000,
    strictPort: true
  }
});
