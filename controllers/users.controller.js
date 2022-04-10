const User = require('../models/User')
const Protectora = require('../models/Protectora')
const validator = require('../utils/service.validations')
const validatorProtectora = require('../utils/service.validations.user')
const  passport = require('passport')

const renderRegistro = (request, response) => {
  response.render('users/signup')
}


const registro = async (req, res) => {
  let errors = [];
  const { email, password, confirm_password, tipo } = req.body;
  if (email.length <= 0 ) {
    errors.push('Inserta email')
  }
  if (password != confirm_password) {
    errors.push("Las contraseñas no coinciden");
  }
  if (password.length < 8 || password.length > 20) {
    errors.push("La contraseña debe contener entre 8 y 20 caracteres");
  }
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    errors.push("Ya existe un usuario con ese email");
  }
  if (tipo == undefined) {
    errors.push("Debe serleccionar un tipo de registro");
  }
  let checkedA;
  let checkedP;
    if (tipo === "Adoptante") {
      checkedA = 'checked'
    } else if (tipo === "Protectora") {
      checkedP = 'checked'
   
  }
  if (errors.length > 0) {

    req.flash("errores", errors);
    res.render("users/signup", {
      errors,
      email,
      password,
      confirm_password,
      tipo,
      checkedA,
      checkedP,
    });
  } 
  else {
    if (tipo === 'Protectora') {
      req.flash('registro', {email, password, tipo})
      res.render("users/signup_protectora", {email, password, tipo});
      // res.redirect('registro/protectora')
    } else {
      req.flash('registro', {email, password, tipo})
      res.render("users/signup_adoptante", {email, password, tipo});
      // res.redirect('registro/protectora')
    }
  }
}



const login = passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
})

const renderLogin = (request, response) => {
  response.render('users/login')
}


module.exports = {renderRegistro, registro,login,renderLogin}