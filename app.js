const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MongoDB = 'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
  uri: MongoDB,
  collection: 'sessions'
});

//models
const User = require('./models/user');

//set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  }
});

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

//database
mongoose
  .connect(MongoDB, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => console.log('server is running'));
  })
  .catch(err => console.log(err));
