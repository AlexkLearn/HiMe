import { config } from "dotenv";

config({
  path: ['.env.development.local', '.env.production.local']
})

export const {
  PORT,
  MONGO_URI,
  JWT_SECRET, JWT_EXPIRES_IN,
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
} = process.env;