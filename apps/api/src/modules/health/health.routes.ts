import { Router } from "express";
import { prisma } from "../../lib/prisma.js";

const router = Router();

/** GET /api/v1/health */
router.get("/", async (_req, res, next) => {
  try {
    // Verify DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
        db: "connected",
      },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
