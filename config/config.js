import dotenv from 'dotenv'

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
<<<<<<< HEAD
  jwtSecret: "YOUR_secret_key",
=======
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
>>>>>>> 4b696a7ccd9cbe09c454a8333908645fc1817722
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2" ||
  process.env.MONGO_HOST ||
  'mongodb://' + (process.env.IP || 'localhost') + ':' +
  (process.env.MONGO_PORT || '27017') +
  '/MusicStore',
  "SECRETKEY": process.env.SECRETKEY
}

export default config

