const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

//database link
const MongoDB = 'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/shop';

//setup express
const app = express();

//setup session sotrage with mongodb
const store = new MongoDBStore({
  uri: MongoDB,
  collection: 'sessions'
});

//setup csrf package
const csrfProtection = csrf();

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

//////////////////// middlewares ////////////////////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//sessions setting
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

//set csrf middleware
app.use(csrfProtection);

//setup flash
app.use(flash());

//set session middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        next( new Error(err));
      });
  }
});

//setting local data to every view
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

//special middleware for error handler
app.use((error, req, res, next) => {
  res.redirect('/500');
});

//database
mongoose
  .connect(MongoDB, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => console.log('server is running'));
  })
  .catch(err => console.log(err));
