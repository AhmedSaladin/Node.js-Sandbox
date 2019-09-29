const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth');
const { body } = require('express-validator');

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .normalizeEmail(),
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  userController.signup
);
router.post('/login',userController.login)

module.exports = router;
