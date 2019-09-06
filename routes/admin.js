const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const auth = require('../middleware/isAuthenticated');

// /admin/add-product => GET
router.get('/add-product', auth, adminController.getAddProduct);

//admin/products => GET
router.get('/products', auth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', auth, adminController.postAddProduct);

//admin/edit-product/:productId => GET
router.get('/edit-product/:productId', auth, adminController.getEditProduct);

//admin/edit-product => POST
router.post('/edit-product', auth, adminController.postEditProduct);

//admin/delete-product => POST
router.post('/delete-product', auth, adminController.postDeleteProduct);

module.exports = router;
