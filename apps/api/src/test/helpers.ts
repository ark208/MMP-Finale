import { prisma } from "../lib/prisma.js";
import { UserRole, UserStatus } from "@saferstreets/shared";
import type { User } from "@prisma/client";

/**
 * Creates a test user with a verified email and active status.
 * Uses a unique suffix to avoid collisions across tests.
 */
export async function createTestUser(
  overrides: Partial<{
    role: UserRole;
    email: string;
    fullName: string;
    status: UserStatus;
  }> = {},
): Promise<User> {
  const suffix = Math.random().toString(36).slice(2, 8);
  const email = overrides.email ?? `test+${suffix}@saferstreets.test`;

  return prisma.user.create({
    data: {
      email,
      emailVerifiedAt: new Date(),
      fullName: overrides.fullName ?? `Test User ${suffix}`,
      role: overrides.role ?? UserRole.USER,
      status: overrides.status ?? UserStatus.ACTIVE,
      termsAcceptedAt: new Date(),
    },
  });
}

export async function createTestUserByRole(role: UserRole): Promise<User> {
  return createTestUser({ role });
}

/** Creates a session for a test user, returns the raw token */
export async function createTestSession(userId: string): Promise<string> {
  const { createHash, randomBytes } = await import("crypto");
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return rawToken;
}

/** Clean up users created during a test */
export async function cleanupUsers(ids: string[]) {
  if (!ids.length) return;
  await prisma.session.deleteMany({ where: { userId: { in: ids } } });
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
}
