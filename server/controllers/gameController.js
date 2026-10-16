import {
  searchGames,
  getGameDetails,
  getFeaturedGames,
} from "../services/gameApi.js";

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

// for game details, we will use the game ID to fetch the details from the RAWG API

export async function getGameDetailsController(req, res) {
  try {
    const { id } = req.params;

    const game = await getGameDetails(id);

    res.json(game);
  } catch (error) {
    console.error("RAWG game details error:", error.message);

    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "Game not found",
      });
    }

    res.status(500).json({
      message: "Failed to fetch game details",
    });
  }
}

// Fetches a list of featured games based on rating, limited to 8 games
export async function getFeaturedGamesController(req, res) {
  try {
    const games = await getFeaturedGames();
    res.json(games);
  } catch (error) {
    console.error("RAWG featured games error:", error.message);

    res.status(500).json({
      message: "Failed to fetch featured games",
    });
  }
}
