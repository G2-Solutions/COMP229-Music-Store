require('dotenv').config();
import path from 'path';
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import express from 'express'
import { configDotenv } from 'dotenv';
import { userSettings } from './userSettings.js';

// Connection URL
const uri = process.env.MONGODB_URI;
mongoose.Promise = global.Promise
mongoose.connect(uri, {
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


