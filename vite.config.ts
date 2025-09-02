import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    server: {
      port: 4173, // Vite default port, aap change kar sakte ho
      strictPort: true, // agar port busy ho to fail kare, auto switch na ho
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 4173
      }
    }
  };
});
