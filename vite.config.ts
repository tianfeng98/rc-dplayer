import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.*)/, replacement: resolve(__dirname, "src/$1") },
      { find: /^#\/(.*)/, replacement: resolve(__dirname, "demo/$1") },
    ],
  },
  plugins: [react(), cssInjectedByJsPlugin()],
  define: {
    GLOBAL_PREFIX: '"rc-dplayer"',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${resolve(__dirname, "src/global.less")}";`,
      },
    },
  },
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    copyPublicDir: false,
  },
});
