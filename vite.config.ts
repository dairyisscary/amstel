import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  build: {
    outDir: "src-tauri/web-dist",
  },
  plugins: [solidPlugin()],
  resolve: {
    alias: [{ find: "@amstel", replacement: "/src" }],
  },
});
