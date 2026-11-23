import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma ??
  new PrismaClient({
    log: [
      { emit: "event", level: "warn" },
      { emit: "event", level: "error" },
    ],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// Log prisma warnings and errors via pino
(prisma as unknown as { $on: (event: string, cb: (e: unknown) => void) => void }).$on("warn", (e) =>
  logger.warn({ prisma: e }, "Prisma warn"),
);
(prisma as unknown as { $on: (event: string, cb: (e: unknown) => void) => void }).$on(
  "error",
  (e) => logger.error({ prisma: e }, "Prisma error"),
);
