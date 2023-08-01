// vite.config.js
import pkg from "./package.json";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: pkg.name,
      fileName: pkg.name,
    },
  },
});
