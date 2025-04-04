import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import { resolve, dirname } from "path";

const currentDir = dirname(new URL(import.meta.url).pathname);

export default mergeConfig(
  defineConfig({
    base: "/front_5th_chapter1-2/",
    esbuild: {
      jsxFactory: "createVNode",
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: "transform",
        jsxFactory: "createVNode",
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(currentDir, "src", "index.html"),
          hash: resolve(currentDir, "src", "index.hash.html"),
        },
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.js",
      exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    },
  }),
);
