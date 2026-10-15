import express from "express";
import {
  searchGamesController,
  getGameDetailsController,
} from "../controllers/gameController.js";

const router = express.Router();

router.get("/search", searchGamesController);
router.get("/:id", getGameDetailsController);

export default router;
