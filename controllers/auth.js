const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');

//setup transporter
const transporter = nodemailer.createTransport(
  sendgrid({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('Error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Loging',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('Error', 'Invalid email or password');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              if (err) {
                console.log(err);
              }
              res.redirect('/');
            });
          }
          req.flash('Error', 'Invalid email or password');
          res.redirect('/login');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('Error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('Error', ' Email is exists');

        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email: email,
            password: hashPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'shop@shop.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
