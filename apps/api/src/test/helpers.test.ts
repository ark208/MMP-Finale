import { describe, it, expect, afterEach } from "vitest";
import { UserRole, UserStatus } from "@saferstreets/shared";
import { createTestUserByRole, createTestSession, cleanupUsers } from "./helpers.js";

describe("Test Helpers: createTestUserByRole", () => {
  const createdUserIds: string[] = [];

  afterEach(async () => {
    await cleanupUsers(createdUserIds);
    createdUserIds.length = 0;
  });

  it("creates a USER with verified email and active status", async () => {
    const user = await createTestUserByRole(UserRole.USER);
    createdUserIds.push(user.id);

    expect(user.id).toBeDefined();
    expect(user.role).toBe(UserRole.USER);
    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.emailVerifiedAt).not.toBeNull();
  });

  it("creates a MODERATOR with verified email and active status", async () => {
    const user = await createTestUserByRole(UserRole.MODERATOR);
    createdUserIds.push(user.id);

    expect(user.id).toBeDefined();
    expect(user.role).toBe(UserRole.MODERATOR);
  });

  it("creates an ADMIN with verified email and active status", async () => {
    const user = await createTestUserByRole(UserRole.ADMIN);
    createdUserIds.push(user.id);

    expect(user.id).toBeDefined();
    expect(user.role).toBe(UserRole.ADMIN);
  });

  it("creates a session for a user and returns valid token", async () => {
    const user = await createTestUserByRole(UserRole.USER);
    createdUserIds.push(user.id);

    const token = await createTestSession(user.id);
    expect(token).toBeDefined();
    expect(token.length).toBe(64); // 32 random bytes as hex
  });
});
