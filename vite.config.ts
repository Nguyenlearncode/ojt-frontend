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
    setupFiles: [
      "src/tests/setup/testUtils.tsx",
      "src/tests/setup/testSetup.ts",
    ],
    include: [
      "src/**/*.test.{ts,tsx}",
      "src/**/__tests__/**/*.{ts,tsx}",
      "src/tests/unit/**/*.{test,spec}.{ts,tsx}",
      "src/tests/integration/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules", "dist", "coverage", "**/build/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"], // ✅ thêm "lcov" để xuất file HTML
      reportsDirectory: "./coverage",     // ✅ đảm bảo xuất ra thư mục coverage
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/tests/**"],
      all: false,
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 85,
        lines: 90,
      },
    },
  },
});
