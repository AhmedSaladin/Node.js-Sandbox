const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');

//set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// middleware for serve bodypaser and static serve
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

//database setup
sequelize
  .sync() //check if there are tables in database to avoid override them
  .then(() => {
    // port setup
    app.listen(3000, () => {
      console.log('Server is running');
    });
  })
  .catch(err => console.log(err));
