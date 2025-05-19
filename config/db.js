const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://youssefaboseif72:dbpCZYiVMdL3vmGq@cluster0.3cspypx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(" MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
