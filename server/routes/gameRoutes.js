import express from "express";
import {
  searchGamesController,
  getGameDetailsController,
  getFeaturedGamesController,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/search", searchGamesController);
router.get("/featured", getFeaturedGamesController);
router.get("/:id", getGameDetailsController);

export default router;
