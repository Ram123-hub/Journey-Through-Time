import mongoose from "mongoose";

const TimeLineSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    title: {
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
    image_url: {
      type: String,
      required: true,  // Ensures that image_url is required
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

export const Timeline =
  mongoose.models.Timeline || mongoose.model("Timeline", TimeLineSchema);
