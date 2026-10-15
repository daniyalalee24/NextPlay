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
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes); // will delete this route later, just for testing purposes
app.use("/api/games", gameRoutes);
app.use("/api/library", libraryRoutes);

app.use("/api/recommendations", recommendationRoutes); // Add the recommendations route

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "NextPlay API is running",
  });
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
