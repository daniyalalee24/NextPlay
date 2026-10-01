import express from "express";
import { searchGamesController } from "../controllers/gameController.js";

const router = express.Router();

router.get("/search", searchGamesController);

export default router;
