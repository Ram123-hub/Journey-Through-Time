import mongoose from "mongoose";

const FamousFigureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  image_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const FamousFigures =
  mongoose.models.FamousFigures ||
  mongoose.model("FamousFigures", FamousFigureSchema);

export { FamousFigures };
