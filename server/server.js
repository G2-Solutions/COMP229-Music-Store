require('dotenv').config();
import path from 'path';
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import express from 'express'
import { configDotenv } from 'dotenv';
import { userSettings } from './userSettings.js';



// Connection URL
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', {
  dbName: 'MusicStore'
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});



app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})


