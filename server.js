const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./server/routes/user.routes');
const assetsRouter = require("./server/assets-router");
const authRoutes = require('./server/routes/auth.routes');
const productRoutes = require('./server/routes/product.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);

app.use("/src", assetsRouter);
app.use("/", express.static(path.join(__dirname, "music-store/public")));

app.get("/*", (_req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.sendFile(path.join(__dirname, "music-store/public", "index.html"));

})

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', {
  dbName: 'MusicStore'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Music Store application.' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});