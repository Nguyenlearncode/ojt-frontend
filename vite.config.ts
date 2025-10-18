import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",

    // Setup chung cho test (cleanup DOM, msw, v.v.)
    setupFiles: [
      "src/tests/setup/testUtils.tsx", // file cleanup / global utils
      "src/tests/setup/testSetup.ts",  // file khởi tạo mock server (MSW)
    ],

    include: [
      "src/**/*.test.{ts,tsx}",
      "src/**/__tests__/**/*.{ts,tsx}",
      "src/tests/unit/**/*.{test,spec}.{ts,tsx}",
      "src/tests/integration/**/*.{test,spec}.{ts,tsx}",
    ],

    exclude: [
      "node_modules",
      "dist",
      "coverage",
      "**/build/**",
    ],

    coverage: {
      reporter: ["text", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/tests/**"],
    },
  },
});
