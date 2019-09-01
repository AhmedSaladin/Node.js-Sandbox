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
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('5d6beace440e4d1d90aa7f91')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

//database
mongoose
  .connect(
    'mongodb+srv://Yuri:0106781075@shop-w1yt3.mongodb.net/shop?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Yuri',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000, () => console.log('server is running'));
  })
  .catch(err => console.log(err));
