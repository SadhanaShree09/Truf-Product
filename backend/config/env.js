import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 4000,

  MONGODB_URI: process.env.MONGODB_URI,

  DATABASE_NAME: process.env.MONGODB_DB,

  JWT_SECRET: process.env.JWT_SECRET,

  NODE_ENV: process.env.NODE_ENV
};