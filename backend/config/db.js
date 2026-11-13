const mongoose = require("mongoose");
const dns = require("dns");

let connected = false;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing");
    }

    // Set reliable DNS servers for SRV resolution (fixes Windows querySrv ECONNREFUSED)
    try {
      dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
    } catch (dnsErr) {
      // Ignore if not allowed in specific sandboxes
    }

    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("MongoDB connected");

    // Ensure primary admin user exists
    try {
      const User = require("../models/userModel");
      const bcryptjs = require("bcryptjs");
      const adminEmail = "websiteshubham8@gmail.com";
      const existing = await User.findOne({ email: adminEmail });
      if (!existing) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash("Shubh@12345", salt);
        await User.create({
          name: "Shubham Gupta",
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
        });
        console.log(`Primary admin account ${adminEmail} initialized`);
      }
    } catch (adminErr) {
      console.warn("Admin account initialization warning:", adminErr.message);
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Don't exit so Render logs stay visible for debugging
    connected = false;
  }
};

const isDBConnected = () => connected;

module.exports = { connectDB, isDBConnected };
