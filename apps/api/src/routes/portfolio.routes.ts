import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware";
import { createPortfolio, getPortfolio, createAlbum, addPhoto } from "../controllers/portfolio.controller";

const router = Router();

// --- Portfolio Routes ---
// POST /api/portfolio/create (Protected: PHOTOGRAPHER only)
router.post("/portfolio/create", authenticateUser, createPortfolio);

// GET /api/portfolio/:photographerId (Public/Protected: Anybody can view)
router.get("/portfolio/:photographerId", getPortfolio);

// --- Album Routes ---
// POST /api/album/create (Protected: PHOTOGRAPHER only, must own Portfolio)
router.post("/album/create", authenticateUser, createAlbum);

// --- Photo Routes ---
// POST /api/photo/add (Protected: PHOTOGRAPHER only, must own Album)
router.post("/photo/add", authenticateUser, addPhoto);

export default router;
