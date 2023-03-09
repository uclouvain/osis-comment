import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({typescript: true, vueTsc: true}),
    eslint(),
    vue(),
  ],
  build: {
    lib: {
      // what to build
      name: 'OsisComment',
      entry: 'frontend/main.ts',
      formats: ['umd'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vue-i18n': 'VueI18n',
        },
        assetFileNames: "osis-comment.[ext]",
      },
    },
  },
});
