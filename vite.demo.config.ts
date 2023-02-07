import type { UserConfigExport } from "vite";
import config from "./vite.config";

export default {
  ...config,
  build: {
    outDir: "dist/build",
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
} as UserConfigExport;
