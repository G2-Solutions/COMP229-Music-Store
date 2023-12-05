import dotenv from 'dotenv'

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://zkgawlak:lA5hqoe2cdaVT92E@cluster0.1bohbsk.mongodb.net/?retryWrites=true&w=majority" ||
  process.env.MONGO_HOST ||
  'mongodb://' + (process.env.IP || 'localhost') + ':' +
  (process.env.MONGO_PORT || '27017') +
  '/MusicStore',
  "SECRETKEY": process.env.SECRETKEY
}

export default config

