import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["tests/**/*.test.{ts,tsx}"],
      environment: "jsdom",
      coverage: {
        provider: "v8",
        include: ["src/**/*.{ts,tsx}"],
        // Browser bootstrap only: mounts <App /> into index.html, which tests render directly.
        exclude: ["src/main.tsx"],
        reporter: ["text"],
        thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
      },
    },
  }),
);
