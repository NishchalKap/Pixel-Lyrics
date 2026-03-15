import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Route: /api/auth/register
router.post("/register", register);

// Route: /api/auth/login
router.post("/login", login);

export default router;
