const router = require('express').Router()
const passport = require('passport');
const google = require('../DB/google')

router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/'}),
  function(req, res) {

    const user = req.user;
    console.log(user);

    res.redirect('http://localhost:4200/');
})

// Ruta protegida que requiere autenticación
// router.get('/dashboard', ensureAuthenticated, function(req, res) {
//   res.send('¡Bienvenido a tu panel de control!');
// });

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   // Si el usuario no está autenticado, redirige a la página de inicio de sesión
//   res.redirect('/');
// }

module.exports = router;
