import rateLimit from "express-rate-limit";
import { AppError } from "../lib/AppError.js";

function rateLimitHandler() {
  return (_req: unknown, _res: unknown, _next: unknown, options: { message: string }) => {
    throw AppError.rateLimited(options.message || "Too many requests, please try again later");
  };
}

/** General API rate limit: 120 req/min per IP (Section 9) */
export const generalRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later",
  handler: rateLimitHandler(),
  skip: (req) => req.path === "/api/v1/health",
});

/** OTP request: 20/h per IP */
export const otpIpRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many OTP requests from this IP, try again in an hour",
  handler: rateLimitHandler(),
});

/** Journeys: 3/h per user */
export const journeyRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many journeys started, try again later",
  handler: rateLimitHandler(),
});

/** Alerts: 3/h per user */
export const alertRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Alert rate limit reached, try again later",
  handler: rateLimitHandler(),
});

/** Reports: 5/day per user */
export const reportRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Report limit reached for today",
  handler: rateLimitHandler(),
});

/** Ride requests: 10/day per user */
export const rideRequestRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Ride request limit reached for today",
  handler: rateLimitHandler(),
});

/** Flags: 20/day per user */
export const flagRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.user?.id ?? req.ip ?? "unknown",
  standardHeaders: true,
  legacyHeaders: false,
  message: "Flag limit reached for today",
  handler: rateLimitHandler(),
});
