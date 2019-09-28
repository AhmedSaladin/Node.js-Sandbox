const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const feedRoutes = require('./routes/feed');

// app.use(bodyParser.urlencoded({}));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

//disable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // star means it enable for all domains
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

//error middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/messages?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen('8080', () => console.log('Server is running on port 8080'));
  })
  .catch(err => console.log(err));
