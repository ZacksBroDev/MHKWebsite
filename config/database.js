// Database Connection - MongoDB setup with Mongoose
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Establish MongoDB connection using connection string from .env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (process.env.NODE_ENV === 'production') {
      console.log('Database connected');
    } else {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process if database connection fails
  }
};

export default connectDB;
