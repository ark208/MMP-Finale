import type { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { AppError } from "../lib/AppError.js";
import { logger } from "../lib/logger.js";

// Central error handler (Section 7.6)
export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const requestId = req.headers["x-request-id"] as string | undefined;

  // Zod validation errors
  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
        details,
        ...(requestId && { requestId }),
      },
    });
    return;
  }

  // Known Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(409).json({
        error: {
          code: "CONFLICT",
          message: "A record with this value already exists",
          ...(requestId && { requestId }),
        },
      });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "Record not found",
          ...(requestId && { requestId }),
        },
      });
      return;
    }
  }

  // AppError
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err, requestId }, err.message);
    } else {
      logger.warn({ err: { code: err.code, message: err.message }, requestId });
    }
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
        ...(requestId && { requestId }),
      },
    });
    return;
  }

  // Unhandled errors — never leak stack traces
  logger.error({ err, requestId }, "Unhandled error");
  res.status(500).json({
    error: {
      code: "INTERNAL",
      message: "An unexpected error occurred",
      ...(requestId && { requestId }),
    },
  });
};
