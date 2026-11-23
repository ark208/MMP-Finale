import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import { pinoHttp } from "pino-http";

import { env } from "./lib/env.js";
import { logger } from "./lib/logger.js";
import { generalRateLimit } from "./middleware/rateLimit.js";
import { errorHandler } from "./middleware/error.js";

import healthRouter from "./modules/health/health.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import reportsRouter from "./modules/reports/reports.routes.js";
import ridesRouter from "./modules/rides/rides.routes.js";
import journeysRouter from "./modules/journeys/journeys.routes.js";
import alertsRouter from "./modules/alerts/alerts.routes.js";
import notificationsRouter from "./modules/notifications/notifications.routes.js";
import adminRouter from "./modules/admin/admin.routes.js";
import uploadsRouter from "./modules/uploads/uploads.routes.js";

export function createApp() {
  const app = express();

  // ── Security headers (Section 9)
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "res.cloudinary.com", "data:"],
        },
      },
      hsts: { maxAge: 31536000, includeSubDomains: true },
    }),
  );

  // ── CORS — strict allowlist (Section 7.3 / 9)
  const allowedOrigins = env.CORS_ORIGINS.split(",").map((o) => o.trim());
  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        cb(new Error("Not allowed by CORS"));
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "X-Requested-With"],
    }),
  );

  // ── Request ID
  app.use((req, _res, next) => {
    req.headers["x-request-id"] = req.headers["x-request-id"] || randomUUID();
    next();
  });

  // ── Pino HTTP logger (Section 7.6: request IDs attached to logs)
  app.use(
    pinoHttp({
      logger,
      genReqId: (req) => (req.headers["x-request-id"] as string) || randomUUID(),
      customLogLevel: (_req, res) => {
        if (res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
      },
      autoLogging: {
        ignore: (req) => req.url === "/api/v1/health",
      },
    }),
  );

  // ── Body parsing
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser());

  // ── Global rate limit (120 req/min per IP)
  app.use(generalRateLimit);

  // ── Routes
  const v1 = "/api/v1";
  app.use(`${v1}/health`, healthRouter);
  app.use(`${v1}/auth`, authRouter);
  app.use(`${v1}`, usersRouter);
  app.use(`${v1}/reports`, reportsRouter);
  app.use(`${v1}/rides`, ridesRouter);
  app.use(`${v1}/journeys`, journeysRouter);
  app.use(`${v1}/alerts`, alertsRouter);
  app.use(`${v1}/notifications`, notificationsRouter);
  app.use(`${v1}/admin`, adminRouter);
  app.use(`${v1}/uploads`, uploadsRouter);

  // ── 404 fallback
  app.use((_req, res) => {
    res.status(404).json({
      error: { code: "NOT_FOUND", message: "Route not found" },
    });
  });

  // ── Central error handler (must be last)
  app.use(errorHandler);

  return app;
}
