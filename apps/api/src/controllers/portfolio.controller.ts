import { type Response } from "express";
import { type AuthRequest } from "../middleware/auth.middleware";
import { PortfolioService } from "../services/portfolio.service";

/**
 * POST /api/portfolio/create
 */
export const createPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bio, location, styleTags } = req.body;
    const photographerId = req.user?.id;

    if (!photographerId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.user?.role !== "PHOTOGRAPHER") {
      res.status(403).json({ error: "Forbidden: Only photographers can create portfolios" });
      return;
    }

    if (!bio || !location || !styleTags || !Array.isArray(styleTags)) {
      res.status(400).json({ error: "Invalid input: missing bio, location, or valid styleTags array" });
      return;
    }

    const portfolio = await PortfolioService.createPortfolio({ photographerId, bio, location, styleTags });
    res.status(201).json({ portfolio });
  } catch (error: any) {
    if (error.message.includes("already has a portfolio") || error.message.includes("not a Photographer")) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to create portfolio" });
  }
};

/**
 * GET /api/portfolio/:photographerId
 */
export const getPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { photographerId } = req.params;

    if (!photographerId) {
      res.status(400).json({ error: "Photographer ID is required" });
      return;
    }

    const portfolio = await PortfolioService.getPortfolioById(photographerId);
    res.status(200).json({ portfolio });
  } catch (error: any) {
    if (error.message === "Portfolio not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

/**
 * POST /api/album/create
 */
export const createAlbum = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { portfolioId, title } = req.body;
    const photographerId = req.user?.id;

    if (!photographerId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.user?.role !== "PHOTOGRAPHER") {
      res.status(403).json({ error: "Forbidden: Only photographers can create albums" });
      return;
    }

    if (!portfolioId || !title) {
      res.status(400).json({ error: "Invalid input: missing portfolioId or title" });
      return;
    }

    const album = await PortfolioService.createAlbum({ portfolioId, title, photographerId });
    res.status(201).json({ album });
  } catch (error: any) {
    if (error.message === "Unauthorized to add albums to this portfolio") {
      res.status(403).json({ error: error.message });
      return;
    }
    if (error.message === "Portfolio not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to create album" });
  }
};

/**
 * POST /api/photo/add
 */
export const addPhoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { albumId, imageUrl } = req.body;
    const photographerId = req.user?.id;

    if (!photographerId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.user?.role !== "PHOTOGRAPHER") {
      res.status(403).json({ error: "Forbidden: Only photographers can add photos" });
      return;
    }

    if (!albumId || !imageUrl) {
      res.status(400).json({ error: "Invalid input: missing albumId or imageUrl" });
      return;
    }

    const photo = await PortfolioService.addPhoto({ albumId, imageUrl, photographerId });
    res.status(201).json({ photo });
  } catch (error: any) {
    if (error.message === "Unauthorized to add photos to this album") {
      res.status(403).json({ error: error.message });
      return;
    }
    if (error.message === "Album not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Failed to add photo" });
  }
};
