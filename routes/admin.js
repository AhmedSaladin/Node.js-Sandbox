const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

const { body } = require('express-validator');

const auth = require('../middleware/isAuthenticated');

// /admin/add-product => GET
router.get('/add-product', auth, adminController.getAddProduct);

//admin/products => GET
router.get('/products', auth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  auth,
  adminController.postAddProduct
);

//admin/edit-product/:productId => GET
router.get('/edit-product/:productId', auth, adminController.getEditProduct);

//admin/edit-product => POST
router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  auth,
  adminController.postEditProduct
);

//admin/delete-product => POST
router.delete('/product/:productId', auth, adminController.deleteProduct);

module.exports = router;
