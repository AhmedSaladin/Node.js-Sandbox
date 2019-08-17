const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//set template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//  routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//middleware handle unknown routes
app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
});

// port setup
app.listen(3000, () => {
  console.log('Server is running');
});
