import prisma from "../config/prisma";

export class PortfolioService {
  /**
   * Creates a new portfolio for a photographer
   */
  static async createPortfolio(data: { photographerId: string; bio: string; location: string; styleTags: string[] }) {
    // 1. Validate photographer exists and has correct Role
    const user = await prisma.user.findUnique({
      where: { id: data.photographerId },
    });

    if (!user || user.role !== "PHOTOGRAPHER") {
      throw new Error("User not found or is not a Photographer");
    }

    // 2. Validate photographer doesn't already have a portfolio
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { photographerId: data.photographerId },
    });

    if (existingPortfolio) {
      throw new Error("Photographer already has a portfolio");
    }

    // 3. Update User profile with bio/location while creating the Portfolio
    await prisma.user.update({
      where: { id: data.photographerId },
      data: {
        bio: data.bio,
        location: data.location,
      },
    });

    const portfolio = await prisma.portfolio.create({
      data: {
        photographerId: data.photographerId,
        specialties: data.styleTags,
      },
    });

    return portfolio;
  }

  /**
   * Retrieves a full photographer portfolio (user details, albums, photos)
   */
  static async getPortfolioById(photographerId: string) {
    const portfolio = await prisma.portfolio.findUnique({
      where: { photographerId },
      include: {
        photographer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            bio: true,
            location: true,
            profilePicture: true,
          },
        },
        albums: {
          include: {
            photos: true,
          },
        },
      },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    return portfolio;
  }

  /**
   * Creates an Album inside a Portfolio
   */
  static async createAlbum(data: { portfolioId: string; title: string; photographerId: string }) {
    // Determine portfolio ownership to enforce security
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: data.portfolioId },
    });

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    if (portfolio.photographerId !== data.photographerId) {
      throw new Error("Unauthorized to add albums to this portfolio");
    }

    const album = await prisma.album.create({
      data: {
        title: data.title,
        portfolioId: data.portfolioId,
      },
    });

    return album;
  }

  /**
   * Adds a generic Photo to an Album
   */
  static async addPhoto(data: { albumId: string; imageUrl: string; photographerId: string }) {
    // Determine album -> portfolio -> photographer ownership for strict security
    const album = await prisma.album.findUnique({
      where: { id: data.albumId },
      include: {
        portfolio: true,
      },
    });

    if (!album) {
      throw new Error("Album not found");
    }

    if (album.portfolio.photographerId !== data.photographerId) {
      throw new Error("Unauthorized to add photos to this album");
    }

    const photo = await prisma.photo.create({
      data: {
        albumId: data.albumId,
        url: data.imageUrl,
      },
    });

    return photo;
  }
}
