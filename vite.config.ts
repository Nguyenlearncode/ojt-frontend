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

  // ================= BUILD CONFIG =================
  build: {
    outDir: "dist", // thư mục xuất build
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      input: "./index.html",
      output: {
        manualChunks: undefined, // tránh splitting không cần thiết trong CI
      },
    },
    chunkSizeWarningLimit: 1500, // tăng giới hạn để tránh cảnh báo "chunk > 500kb"
  },

  // ================= TEST CONFIG =================
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
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/tests/**",
        "src/**/__tests__/**",
        "src/features/**/hooks/**",
        "src/features/**/api/**",
        "src/api/**",
      ],
      all: false,
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 85,
        lines: 90,
      },
    },
    silent: true, // tránh spam log quá nhiều trong Jenkins
    maxConcurrency: 4, // giới hạn số test song song, giúp ổn định CI
  },
});
