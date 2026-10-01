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
