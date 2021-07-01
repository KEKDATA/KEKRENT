import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { babel } from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    babel({
      include: ['./src/**'],
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
    }),
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, './src/api'),
      assets: path.resolve(__dirname, './src/assets'),
      contracts: path.resolve(__dirname, './src/contracts'),
      features: path.resolve(__dirname, './src/features'),
      lib: path.resolve(__dirname, './src/lib'),
      models: path.resolve(__dirname, './src/models'),
      pages: path.resolve(__dirname, './src/pages'),
      typings: path.resolve(__dirname, './src/typings'),
      ui: path.resolve(__dirname, './src/ui'),
    },
  },
});
