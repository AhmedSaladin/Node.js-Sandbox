exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Loging',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isloggedIn = true;
  res.redirect('/');
};
