import { defineConfig } from "vite";

export default defineConfig({
  // ...existing code...
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
