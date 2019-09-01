const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

//models
const User = require('./models/user');

//set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('5d6910c1e85c69070c2af612')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

//database
mongoose
  .connect(
    'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000, () => console.log('server is running'));
  })
  .catch(err => console.log(err));
