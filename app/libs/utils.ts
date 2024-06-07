import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      console.log("Already Connected to DB");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URL || "");
    console.log("Connected to DB");
  } catch (error) {
    throw new Error(String(error));
  }
};
