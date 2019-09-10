const express = require('express');
const router = express.Router();
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
router.post('/signup', authController.postSignup);

// /resetpassword => POST
router.post('/reset', authController.postReset);

// /new-password => POST
router.post('/new-password', authController.postNewPassword);

// /logout => POST
router.post('/logout', authController.postLogout);

module.exports = router;
