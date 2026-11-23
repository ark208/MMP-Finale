import type { Request, Response, NextFunction } from "express";
import { createHash, timingSafeEqual } from "crypto";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/AppError.js";
import { UserRole, UserStatus } from "@saferstreets/shared";
import type { User } from "@prisma/client";

// Augment Express Request
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
      sessionId?: string;
    }
  }
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * requireAuth — Section 7.3 / 9
 * Reads the session cookie, hashes the token, loads session + user.
 * Rejects revoked, expired, BANNED, SUSPENDED, DELETED users.
 */
export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const rawToken = req.cookies?.["ss_session"] as string | undefined;
    if (!rawToken) throw AppError.unauthenticated();

    const tokenHash = hashToken(rawToken);
    const session = await prisma.session.findUnique({ where: { tokenHash } });

    if (!session || session.revokedAt || session.expiresAt < new Date()) {
      throw AppError.unauthenticated("Session expired or revoked");
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });

    if (!user || user.deletedAt) throw AppError.unauthenticated();
    if (user.status === UserStatus.BANNED) {
      throw AppError.forbidden("Your account has been banned");
    }
    if (user.status === UserStatus.SUSPENDED) {
      throw AppError.forbidden("Your account is currently suspended");
    }

    req.user = user;
    req.sessionId = session.id;
    next();
  } catch (err) {
    next(err);
  }
}

/**
 * optionalAuth — attaches user if session present, continues either way.
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const rawToken = req.cookies?.["ss_session"] as string | undefined;
    if (!rawToken) return next();

    const tokenHash = hashToken(rawToken);
    const session = await prisma.session.findUnique({ where: { tokenHash } });
    if (!session || session.revokedAt || session.expiresAt < new Date()) return next();

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (user && !user.deletedAt && user.status === UserStatus.ACTIVE) {
      req.user = user;
      req.sessionId = session.id;
    }
    next();
  } catch {
    next(); // gracefully degrade
  }
}

/**
 * requireRole — Section 7.3: ADMIN implies MODERATOR.
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(AppError.unauthenticated());
    // Admin can do anything a moderator can
    const effective =
      req.user.role === UserRole.ADMIN
        ? [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER]
        : req.user.role === UserRole.MODERATOR
          ? [UserRole.MODERATOR, UserRole.USER]
          : [UserRole.USER];

    const allowed = roles.some((r) => effective.includes(r));
    if (!allowed) return next(AppError.forbidden());
    next();
  };
}

// CSRF protection: state-changing requests must have X-Requested-With header (Section 7.3)
export function csrfCheck(req: Request, _res: Response, next: NextFunction) {
  const safe = ["GET", "HEAD", "OPTIONS"];
  if (safe.includes(req.method)) return next();
  if (req.headers["x-requested-with"] === "XMLHttpRequest") return next();
  next(AppError.forbidden("CSRF check failed"));
}

// Constant-time comparison utility (used in OTP service)
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
