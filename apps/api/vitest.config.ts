import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    env: {
      NODE_ENV: "test",
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/saferstreets_test?schema=public",
      DATABASE_URL_TEST:
        "postgresql://postgres:postgres@localhost:5432/saferstreets_test?schema=public",
      SESSION_SECRET: "test-session-secret-at-least-32-chars-long",
      OTP_HMAC_SECRET: "test-otp-hmac-secret-at-least-32-chars-long",
      APP_URL: "http://localhost:3000",
      API_URL: "http://localhost:4000",
      CORS_ORIGINS: "http://localhost:3000",
    },
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      exclude: ["src/test/**", "dist/**"],
    },
    pool: "forks",
    poolOptions: { forks: { singleFork: true } },
  },
});
