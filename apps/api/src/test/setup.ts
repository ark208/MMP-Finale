import { afterAll, beforeAll } from "vitest";
import { prisma } from "../lib/prisma.js";

// Use test DB for all tests
beforeAll(() => {
  if (process.env.DATABASE_URL_TEST) {
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});
