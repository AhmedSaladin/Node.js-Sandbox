const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

const auth = require('../middleware/isAuthenticated');

// / => GET
router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /products/productId => GET
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', auth, shopController.getCart);

// /cart => POST
router.post('/cart', auth, shopController.postCart);

// /cart => POST
router.post('/cart-delete-item', auth, shopController.postCartDeleteProduct);

// /order => POST
router.post('/create-order', auth, shopController.postOrder);

// /checkout => GET
router.get('/checkout', auth, shopController.getCheckout);

//orders => GET
router.get('/orders', auth, shopController.getOrders);

//orders/orderId => GET
router.get('/orders/:orderId', auth, shopController.getInvoice);

module.exports = router;
