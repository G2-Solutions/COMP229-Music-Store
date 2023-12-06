import dotenv from 'dotenv'
const uri = process.env.MONGODB_URI;

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || uri ||
  process.env.MONGO_HOST,
  "SECRETKEY": process.env.SECRETKEY
}

export default config

