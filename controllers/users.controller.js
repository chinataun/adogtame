const User = require('../models/User')
const Protectora = require('../models/Protectora')
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
  if (errors.length > 0) {

    req.flash("errores", errors);
    res.render("users/signup", {
      errors,
      email,
      password,
      confirm_password,
      tipo
    });
  } 
  else {if (tipo === 'Protectora') {
    req.flash('registro', {email, password, tipo})
    res.render("users/signup_protectora", {email, password, tipo});
    // res.redirect('registro/protectora')
  }
          }
    }
    const renderRegistroProtectora =  (request, response) => {

      response.redirect('/users/registro')
    }
    
    const registroProtectora = async (request, response) => {
      let errors = [];
      const { email, cif, telefono, descripcion, nombre, password } = request.body;
      console.log(request.body)
      let tipo = 'protectora'
      if (!validator.validateNombre(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
    
      console.log(errors)
      const newProtectora = new Protectora({ nombre, email, tipo, cif, telefono, descripcion, password });
      newProtectora.password = await newProtectora.encryptPassword(password);
      await newProtectora.save();
      request.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
      response.redirect('/users/login')
    }

    const login = passport.authenticate('local', {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true,
    })

    const renderLogin = (request, response) => {
      response.render('users/login')
    }

   module.exports = {renderRegistro, registro,renderRegistroProtectora, registroProtectora,login,renderLogin
   }