import type { ErrorCode } from "@saferstreets/shared";

// Map error codes to HTTP status (Section 7.2)
const STATUS_MAP: Record<ErrorCode, number> = {
  VALIDATION_ERROR: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  RATE_LIMITED: 429,
  INTERNAL: 500,
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: Array<{ field?: string; message: string }>;

  constructor(
    code: ErrorCode,
    message: string,
    details?: Array<{ field?: string; message: string }>,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = STATUS_MAP[code];
    this.details = details;
    // maintain proper prototype chain
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static badRequest(msg: string, details?: Array<{ field?: string; message: string }>) {
    return new AppError("VALIDATION_ERROR", msg, details);
  }

  static unauthenticated(msg = "Authentication required") {
    return new AppError("UNAUTHENTICATED", msg);
  }

  static forbidden(msg = "Access denied") {
    return new AppError("FORBIDDEN", msg);
  }

  static notFound(resource = "Resource") {
    return new AppError("NOT_FOUND", `${resource} not found`);
  }

  static conflict(msg: string) {
    return new AppError("CONFLICT", msg);
  }

  static rateLimited(msg = "Too many requests") {
    return new AppError("RATE_LIMITED", msg);
  }

  static internal(msg = "Internal server error") {
    return new AppError("INTERNAL", msg);
  }
}
