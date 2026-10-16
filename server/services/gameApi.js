import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api";

export async function searchGames(query) {
  const response = await axios.get(`${RAWG_BASE_URL}/games`, {
    params: {
      key: process.env.GAME_API_KEY,
      search: query,
      page_size: 12,
    },
  });

  return response.data;
}

export async function getGameDetails(gameId) {
  const response = await axios.get(`${RAWG_BASE_URL}/games/${gameId}`, {
    params: {
      key: process.env.GAME_API_KEY,
    },
  });

  return response.data;
}

// Fetches a list of featured games based on rating, limited to 8 games
export async function getFeaturedGames() {
  const response = await axios.get(`${RAWG_BASE_URL}/games`, {
    params: {
      key: process.env.GAME_API_KEY,
      ordering: "-rating",
      page_size: 8,
    },
  });

  return response.data;
}
