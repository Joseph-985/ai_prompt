import * as Mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

let isConnected = false;
const MONG0DB_URI = !process.env.MONGODB_URI ? "" : process.env.MONGODB_URI;

export const connectToDatabase = async () => {
  Mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("database is already connected");
    return;
  }

  try {
    await Mongoose.connect(MONG0DB_URI, {
      dbName: "share-prompt",
    } as ConnectOptions);

    isConnected = true;
    console.log("MongoDb Connected");
  } catch (error: any) {
    console.log(error.message);
  }
};
