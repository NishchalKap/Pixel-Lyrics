import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import devRoutes from "./routes/dev.routes";
import portfolioRoutes from "./routes/portfolio.routes";
// import bookingRoutes from "./routes/booking.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "pixel-lyrics API is running gracefully." });
});

// Domain Routes
app.use("/api/auth", authRoutes);
app.use("/api/dev", devRoutes);
app.use("/api", portfolioRoutes);
// app.use("/api/portfolios", portfolioRoutes);
// app.use("/api/bookings", bookingRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went terribly wrong." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
