// src/lib/models/user.ts
import mongoose, { Schema, models, model } from "mongoose";
import connect from "../dbconfig/dbconfig";

connect(); // Ensure connection before defining the model

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
  },
});

const User = mongoose.models.User || model("User", userSchema);

export { User };
