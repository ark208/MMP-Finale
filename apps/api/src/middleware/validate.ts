import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../lib/AppError.js";

type ValidateTarget = "body" | "query" | "params";

/**
 * validate — Zod middleware (Section 7.1 / 7.6)
 * Strips unknown keys, trims strings, coerces where needed.
 */
export function validate(schema: ZodSchema, target: ValidateTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const details = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return next(AppError.badRequest("Invalid input", details));
    }
    // Replace with parsed (stripped + coerced) data
    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
}
