
// src/lib/db.ts
import mongoose from "mongoose";

let isConnected = false; // Track connection status globally

export default async function connect(): Promise<void> {
  if (isConnected) {
    console.log("MongoDB connection is already established");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    console.log("Attempting to connect to MongoDB with URI:", mongoUri); // Debugging log
    await mongoose.connect(mongoUri); // No need for `useNewUrlParser` or `useUnifiedTopology`
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
