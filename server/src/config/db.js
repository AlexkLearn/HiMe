import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`Database connected successfully: @${conn.connection.host}`);
  }
  catch (e) {
    console.error(`DB connection error: ${e.message}`);
  }
}

export default dbConnection;