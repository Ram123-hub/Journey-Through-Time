import mongoose from "mongoose";

const EraExplorationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    image_url: { // Changed from image_url to image
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EraExploration =
  mongoose.models.EraExploration || mongoose.model("EraExploration", EraExplorationSchema);

