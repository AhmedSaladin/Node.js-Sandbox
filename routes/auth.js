const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

// /login => GET
router.get('/login', authController.getLogin);

// /signup => GET
router.get('/signup', authController.getSignup);

// /resetpassword => GET
router.get('/reset', authController.getReset);

// /reset/token => GET
router.get('/reset/:token', authController.getNewPassword);

// /login => POST
router.post('/login', authController.postLogin);

// /signup => POST
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail is exists');
          }
        });
      }),
    body(
      'password',
      'please enter a password with only numbers and text and at least 5 characters'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
  ],
  authController.postSignup
);

// /resetpassword => POST
router.post('/reset', authController.postReset);

// /new-password => POST
router.post('/new-password', authController.postNewPassword);

// /logout => POST
router.post('/logout', authController.postLogout);

module.exports = router;
