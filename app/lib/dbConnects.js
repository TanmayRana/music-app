import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("MongoDB is already connected");

    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    isConnected = true;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connected Failed", error);
    process.exit(1);
  }
};
