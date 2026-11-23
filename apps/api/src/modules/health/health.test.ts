import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../../app.js";

const app = createApp();

describe("GET /api/v1/health", () => {
  it("returns 200 with status ok and db connected", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe("ok");
    expect(res.body.data.db).toBe("connected");
    expect(res.body.data.timestamp).toBeDefined();
  });
});

describe("Unknown route", () => {
  it("returns 404 NOT_FOUND", async () => {
    const res = await request(app).get("/api/v1/nonexistent");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});
