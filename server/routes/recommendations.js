import express from "express";
import axios from "axios";
import Library from "../models/Library.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Map display genres to RAWG API slugs
const genreSlugMap = {
  Action: "action",
  Adventure: "adventure",
  RPG: "role-playing-games-rpg",
  Shooter: "shooter",
  Puzzle: "puzzle",
  Strategy: "strategy",
  Indie: "indie",
  Platformer: "platformer",
  Racing: "racing",
  Sports: "sports",
};

// Estimate play style category from RAWG playtime
const getSessionCategory = (playtime) => {
  if (!playtime || playtime <= 5) return "Casual";
  if (playtime <= 20) return "Medium";
  return "Long";
};

// POST /api/recommendations
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      genres: preferredGenres = [],
      sessionLength = "Medium",
      source = "discover",
    } = req.body;

    const apiKey = process.env.RAWG_API_KEY || process.env.RAWG_KEY;
    if (!apiKey && source === "discover") {
      console.error("ERROR: RAWG API key missing in server/.env");
      return res.status(500).json({
        message: "Server configuration error: RAWG API key is missing in .env",
      });
    }

    const userId = req.user?.userId || req.user?.id || req.user?._id;

    // 1. Fetch user's library for history bonus and duplicates filtering
    const userLibrary = await Library.find({ user: userId });
    const libraryGameIds = new Set(userLibrary.map((item) => item.gameId));

    const favoriteGenres = new Set(
      userLibrary
        .filter((item) => item.favorite || (item.rating && item.rating >= 4))
        .flatMap((item) => item.genres || []),
    );

    let candidateGames = [];

    if (source === "backlog") {
      candidateGames = userLibrary
        .filter((item) => item.status === "Want to Play")
        .map((game) => ({
          gameId: game.gameId,
          title: game.title,
          cover: game.cover,
          genres: game.genres || [],
          rating: game.rating || 0,
          playtime: 0,
        }));
    } else {
      // Use the first selected genre slug for a clean, single-genre RAWG API query
      const primaryGenreSlug =
        preferredGenres.length > 0
          ? genreSlugMap[preferredGenres[0]] || preferredGenres[0].toLowerCase()
          : undefined;

      const rawgResponse = await axios.get("https://api.rawg.io/api/games", {
        params: {
          key: apiKey,
          genres: primaryGenreSlug,
          page_size: 25,
        },
      });

      candidateGames = (rawgResponse.data?.results || []).map((game) => ({
        gameId: game.id,
        title: game.name,
        cover: game.background_image,
        genres: game.genres?.map((g) => g.name) || [],
        rating: game.rating || 0,
        playtime: game.playtime || 0,
      }));
    }

    // 2. Score candidate games
    const scoredGames = candidateGames.map((game) => {
      let score = 0;
      const reasons = [];

      // A. Genre Match (+40 max)
      const matchingGenres = (game.genres || []).filter((g) =>
        preferredGenres.some((pref) => pref.toLowerCase() === g.toLowerCase()),
      );

      if (matchingGenres.length > 0) {
        const genreScore = Math.min(40, matchingGenres.length * 20);
        score += genreScore;
        reasons.push(
          `Matches your genre preference: ${matchingGenres.join(", ")} (+${genreScore} pts)`,
        );
      } else {
        score += 10;
      }

      // B. Session Length Match (+30 max)
      const gameSession = getSessionCategory(game.playtime);
      if (sessionLength === gameSession) {
        score += 30;
        reasons.push(
          `Fits your ${sessionLength.toLowerCase()} session length (+30 pts)`,
        );
      } else {
        score += 10;
      }

      // C. Personal Rating & Favorites Bonus (+20 max)
      const matchesFavoriteGenres = (game.genres || []).some((g) =>
        favoriteGenres.has(g),
      );
      if (matchesFavoriteGenres) {
        score += 20;
        reasons.push(
          `Aligns with genres from your favorite/highly-rated games (+20 pts)`,
        );
      }

      // D. Freshness / Backlog Bonus (+10 max)
      if (source === "discover" && !libraryGameIds.has(game.gameId)) {
        score += 10;
        reasons.push(`Fresh recommendation not in your library yet (+10 pts)`);
      } else if (source === "backlog") {
        score += 10;
        reasons.push(`Ready to play in your backlog (+10 pts)`);
      }

      return {
        ...game,
        score,
        reasons,
      };
    });

    // Sort by score descending
    scoredGames.sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      count: scoredGames.length,
      recommendations: scoredGames.slice(0, 6),
    });
  } catch (error) {
    console.error(
      "RAWG Recommendation Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({
      message:
        error.response?.data?.detail ||
        "Failed to generate game recommendations. Check server terminal for details.",
    });
  }
});

export default router;
