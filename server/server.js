import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";
import recommendationRoutes from "./routes/recommendations.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database before handling any requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Add this block to handle the root URL
app.get("/", (req, res) => {
  res.send("NextPlay API is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "NextPlay API is running",
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
