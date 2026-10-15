import Library from "../models/Library.js";

export async function addToLibrary(req, res) {
  try {
    const { gameId, title, cover, genres } = req.body;

    if (!gameId || !title) {
      return res.status(400).json({
        message: "Game ID and title are required",
      });
    }

    const existingGame = await Library.findOne({
      user: req.user.userId,
      gameId,
    });

    if (existingGame) {
      return res.status(409).json({
        message: "Game is already in your library",
      });
    }

    const libraryGame = await Library.create({
      user: req.user.userId,
      gameId,
      title,
      cover: cover || "",
      genres: genres || [],
    });

    res.status(201).json({
      message: "Game added to your library",
      game: libraryGame,
    });
  } catch (error) {
    // MongoDB uses error code 11000 for duplicate-key errors.
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Game is already in your library",
      });
    }

    console.error("Add to library error:", error.message);

    res.status(500).json({
      message: "Failed to add game to library",
    });
  }
}

// Get the user's library

export async function getMyLibrary(req, res) {
  try {
    const games = await Library.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ games });
  } catch (error) {
    console.error("Get library error:", error.message);

    res.status(500).json({
      message: "Failed to fetch your library",
    });
  }
}

// Update a game in the user's library

export async function updateLibraryGame(req, res) {
  try {
    const { status, rating, favorite } = req.body;

    const allowedStatuses = ["Want to Play", "Playing", "Completed"];

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid game status",
      });
    }

    if (
      rating !== undefined &&
      rating !== null &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      return res.status(400).json({
        message: "Rating must be a number between 1 and 5",
      });
    }

    if (favorite !== undefined && typeof favorite !== "boolean") {
      return res.status(400).json({
        message: "Favorite must be true or false",
      });
    }

    const updates = {};

    if (status !== undefined) updates.status = status;
    if (rating !== undefined) updates.rating = rating;
    if (favorite !== undefined) updates.favorite = favorite;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide at least one field to update",
      });
    }

    const game = await Library.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!game) {
      return res.status(404).json({
        message: "Game not found in your library",
      });
    }

    res.status(200).json({
      message: "Library game updated",
      game,
    });
  } catch (error) {
    console.error("Update library game error:", error.message);

    res.status(500).json({
      message: "Failed to update library game",
    });
  }
}

// Remove a game from the user's library

export async function removeFromLibrary(req, res) {
  try {
    const game = await Library.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!game) {
      return res.status(404).json({
        message: "Game not found in your library",
      });
    }

    res.status(200).json({
      message: "Game removed from your library",
    });
  } catch (error) {
    console.error("Remove from library error:", error.message);

    res.status(500).json({
      message: "Failed to remove game from library",
    });
  }
}
