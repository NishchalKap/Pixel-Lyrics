import { Router, type Response } from "express";
import { authenticateUser, type AuthRequest } from "../middleware/auth.middleware";
import prisma from "../config/prisma";

const router = Router();

// Route: GET /api/dev/protected
router.get("/protected", authenticateUser, (req: AuthRequest, res: Response): void => {
  res.status(200).json({
    message: "Authentication working",
    user: req.user,
  });
});

// Route: GET /api/dev/users (For DB Verification)
router.get("/users", async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users from Supabase DB" });
  }
});

export default router;
