const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');

// /admin/add-product => GET
router.get('/add-product', productController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

module.exports = router;
