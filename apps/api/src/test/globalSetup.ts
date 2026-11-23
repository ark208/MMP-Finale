import { execSync } from "child_process";
import { logger } from "../lib/logger.js";

/**
 * Global setup — runs once before all test suites.
 * Applies migrations to the TEST database.
 */
export async function setup() {
  const testDbUrl = process.env.DATABASE_URL_TEST;
  if (!testDbUrl) {
    throw new Error("DATABASE_URL_TEST must be set for tests");
  }
  // Point Prisma at the test DB
  process.env.DATABASE_URL = testDbUrl;

  logger.info("Applying migrations to test database...");
  execSync("pnpm prisma migrate deploy", {
    env: { ...process.env, DATABASE_URL: testDbUrl },
    stdio: "inherit",
  });
  logger.info("Test database ready");
}

export async function teardown() {
  // Connection cleanup is handled per-test-file via the test helper
}
