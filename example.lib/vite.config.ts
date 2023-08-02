// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "lib.ts",
      name: "dumblib",
    },
    rollupOptions: {
      external: ["L"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          L: "L",
        },
      },
    },
  },
});
