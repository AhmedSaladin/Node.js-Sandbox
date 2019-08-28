const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//database
const mongoConnect = require('./util/database').mongoConnect;

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

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000, () => console.log('server is running'));
});
