const User = require('../models/User')
const Protectora = require('../models/Protectora')
const { check, body, validationResult } = require('express-validator')
const validator = require('../utils/service.validations')
const  passport = require('passport')


const renderRegistro = (request, response) => {
  response.render('users/signup')
}


const registro = async (req, res) => {
  let errors = [];
  const { email, password, confirm_password, tipo } = req.body;
  console.log(req.body)
  if (email.length <= 0 ) {
    errors.push('Inserta email')
  }
  if (password != confirm_password) {
    console.log('pedo')
    errors.push("Las contraseñas no coinciden");
  }
  if (password.length < 8 || password.length > 20) {
    errors.push("La contraseña debe contener entre 8 y 20 caracteres");
  }
  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    errors.push("Ya existe un usuario con ese email");
  }
  console.log(errors.length)
  if (errors.length > 0) {

    req.flash("errores", errors);
    console.log(req.flash('errores'))
    res.render("users/signup", {
      errors,
      email,
      password,
      confirm_password,
      tipo
    });
  } 
  else {
            res.redirect('registro/protectora') 
          }
    }

   module.exports = {renderRegistro, registro}