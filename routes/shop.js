const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');
// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /products/productId => GET
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', shopController.getCart);

// /cart => POST
router.post('/cart', shopController.postCart);

// /cart => POST
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

// /orders => GET
router.get('/orders', shopController.getOrders);

module.exports = router;
