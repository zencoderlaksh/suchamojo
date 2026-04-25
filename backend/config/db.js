const mongoose = require("mongoose");

let connected = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Don't exit so Render logs stay visible for debugging
    connected = false;
  }
};

const isDBConnected = () => connected;

module.exports = { connectDB, isDBConnected };
