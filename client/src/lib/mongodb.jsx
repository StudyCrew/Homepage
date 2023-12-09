import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectDB = () => {
  try {
    mongoose.set("strictQuery", true);

    if (isConnected) {
      console.log("DB is already connected");
      return;
    }

    mongoose.connect(String(process.env.MONGODB_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Kioku",
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log("Error ->", error);
  }
};
