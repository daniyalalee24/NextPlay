import mongoose from "mongoose";

const librarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gameId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    cover: {
      type: String,
      default: "",
    },

    genres: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Want to Play", "Playing", "Completed"],
      default: "Want to Play",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

librarySchema.index({ user: 1, gameId: 1 }, { unique: true });

const Library = mongoose.model("Library", librarySchema);

export default Library;
