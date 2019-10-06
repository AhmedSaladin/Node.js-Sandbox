const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

//Graphql setup
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

//Multer Configure
const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    let a = Math.random() * 10;
    cb(null, a + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).single('image')
);

//Disable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // star means it enable for all domains
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

//error middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//Database connection
mongoose
  .connect(
    'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/messages?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen('8080', () => console.log('Server is running on port 8080'));
  })
  .catch(err => console.log(err));
