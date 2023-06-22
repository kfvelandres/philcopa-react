import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  // vite config
  if (command === 'serve') {
    return {
      // dev specific config
      define: {
        __APP_ENV__: env.APP_ENV,
      },
      plugins: [react(), eslint(), basicSsl()],
      resolve: {
        alias: {
          src: path.resolve(__dirname, 'src'),
        },
      },
      server: { https: true, host: true, port: 3030, hot: true },
      base: '/philcopa',
    }
  } else {
    // command === 'build'
    return {
      // build specific config
      define: {
        __APP_ENV__: env.APP_ENV,
      },
      plugins: [react()],
      resolve: {
        alias: {
          src: path.resolve(__dirname, 'src'),
        },
      },
      build: {
        target: 'es2015',
        // generate manifest.json in outDir
        manifest: true,
        rollupOptions: {
          // overwrite default .html entry
          //input: '/src/main.jsx',
        },
        //outDir: '../src/main/resources/static',
        emptyOutDir: true,
      },
      base: '/philcopa',
    }
  }
})
