import path from 'path';
import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`CURRENT COMMAND: ${command}`);
  console.log(`CURRENT MODE: ${mode}`);

  const env = loadEnv(mode, process.cwd(), 'APP_');

  return {
    plugins: [
        react()
    ],
    define: {
        'import.meta.env.APP_BACKEND_TOP_LEVEL_DOMAIN': JSON.stringify(env.APP_BACKEND_TOP_LEVEL_DOMAIN),
        'import.meta.env.APP_BACKEND_API_DOMAIN': JSON.stringify(env.APP_BACKEND_API_DOMAIN),
        'import.meta.env.APP_BACKEND_API_PROTOCOL': JSON.stringify(env.APP_BACKEND_API_PROTOCOL),
        'import.meta.env.APP_BACKEND_API_PORT': JSON.stringify(env.APP_BACKEND_API_PORT),

        'import.meta.env.APP_FRONTEND_DOMAIN': JSON.stringify(env.APP_FRONTEND_DOMAIN),
        'import.meta.env.APP_FRONTEND_PROTOCOL': JSON.stringify(env.APP_FRONTEND_PROTOCOL),
        'import.meta.env.APP_FRONTEND_PORT': JSON.stringify(env.APP_FRONTEND_PORT),
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@assets": path.resolve(__dirname, "./assets"),
        },
    },
    build: {
      rollupOptions: {
        input: 'index.html'     
      }
    }
  }
});
