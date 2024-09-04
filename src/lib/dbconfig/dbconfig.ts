// src/lib/db.ts
import mongoose from "mongoose";

let isConnected = false;

export default async function connect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw error;
  }
}
