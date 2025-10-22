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

    // 🧩 Các thư mục test bạn cho phép
    include: [
      "src/**/*.test.{ts,tsx}",
      "src/**/__tests__/**/*.{ts,tsx}",
      "src/tests/unit/**/*.{test,spec}.{ts,tsx}",
      "src/tests/integration/**/*.{test,spec}.{ts,tsx}",
    ],

    // 🚫 Loại bỏ các thư mục build, coverage, node_modules
    exclude: ["node_modules", "dist", "coverage", "**/build/**"],

    coverage: {
      provider: "v8", // nhanh và tương thích tốt với Vitest
      reporter: ["text", "html", "lcov"], // xuất HTML + file lcov cho CI/CD
      reportsDirectory: "./coverage",

      // ✅ Chỉ đo coverage trong src
      include: ["src/**/*.{ts,tsx}"],

      // 🚫 Loại bỏ hook, API, test setup, axios client, và file test
      exclude: [
        "src/tests/**",
        "src/**/__tests__/**",
        "src/features/**/hooks/**",
        "src/features/**/api/**",
        "src/api/**",
      ],

      // ❗ Không ép đo coverage cho file chưa import
      all: false,

      // ✅ Ngưỡng coverage nghiêm ngặt cho UI logic
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 85,
        lines: 90,
      },
    },
  },
});
