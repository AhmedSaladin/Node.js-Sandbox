const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');

//models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//  routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//middleware handle unknown routes
app.use(errorController.get404);

//////////////// Database Relations ///////////////////
/* this line(48) mean user have the products
 constraints mean the product is record 
 by user 
 and on delete or cascade mean the products
 with this user delete with him
*/
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// database setup
sequelize
  .sync() //check if there are tables in database to avoid override them
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(() => {
    // port setup
    app.listen(3000, () => {
      console.log('Server is running');
    });
  })
  .catch(err => console.log(err));
