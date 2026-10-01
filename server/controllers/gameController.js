import { searchGames } from "../services/gameApi.js";

// handles the request from our frontend
export async function searchGamesController(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const games = await searchGames(query);

    res.json(games);
  } catch (error) {
    console.error("RAWG API error:", error.message);

    res.status(500).json({
      message: "Failed to fetch games",
    });
  }
}
