import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed!", error);
    throw new Error("Failed to connect to database");
  }
};

export default connectDB;
