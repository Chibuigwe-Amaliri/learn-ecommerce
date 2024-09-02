const User = require('../model/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
   User.findById('66b575edd3d2385b4ec071cd')
     .then(user => {
       req.session.isLoggedIn = true;
       req.session.user = user;
         res.redirect('/');
     })
     .catch(err => console.log(err));
 };

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};