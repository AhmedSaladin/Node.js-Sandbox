exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
  console.log(req.session.isloggedIn);
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
