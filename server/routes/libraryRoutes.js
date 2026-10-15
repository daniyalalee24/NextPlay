import express from "express";
import {
  addToLibrary,
  getMyLibrary,
  updateLibraryGame,
  removeFromLibrary,
} from "../controllers/libraryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get the logged-in user's library
router.get("/", authMiddleware, getMyLibrary);

// Add a game to the library
router.post("/", authMiddleware, addToLibrary);

// Update a game in the library
router.patch("/:id", authMiddleware, updateLibraryGame);

// Remove a game from the library
router.delete("/:id", authMiddleware, removeFromLibrary);

export default router;
