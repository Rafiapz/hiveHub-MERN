import mongoose from "mongoose";
import { config } from "./config";

export const connect = async () => {
  try {
    const user = config.mongo.username;
    const pass = config.mongo.password
    await mongoose.connect(`${config.mongo.host}/${config.mongo.database}`, {
      auth: {
        username: user,
        password: pass,
      },
      authSource: "admin",
    });
    // await mongoose.connect("mongodb://127.0.0.1:27017/hiveHub")

    console.log(`🍃 Database Established connection with MongoDB`);

  } catch (error: any) {
    console.error(`❌ Database Connection failed`);
    console.error(error.message);
  }
};
