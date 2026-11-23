import pino from "pino";
import { env } from "./env.js";

export const logger = pino({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  ...(env.NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        ignore: "pid,hostname",
        translateTime: "SYS:HH:MM:ss",
      },
    },
  }),
  // Never log PII — phone numbers, full emails in body
  redact: {
    paths: ["req.headers.cookie", "req.body.phone", "*.phone"],
    censor: "[REDACTED]",
  },
});
