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
  // const emailUser = await User.findOne({ email: email });
  // if (emailUser) {
  //   errors.push("Ya existe un usuario con ese email");
  // }
  console.log(errors.length)
  // if (errors.length > 0) {

  //   req.flash("errores", errors);
  //   console.log(req.flash('errores'))
  //   res.render("users/signup", {
  //     errors,
  //     email,
  //     password,
  //     confirm_password,
  //     tipo
  //   });
  // } 
  // else {
    if (tipo === 'Protectora') {
        req.flash('registro', {email, password, tipo})
        res.render("users/signup_protectora", {email, password, tipo});
        // res.redirect('registro/protectora')
      }
      // else{
      //   registroAdoptante
      // }
    // }



    //Aqui mandamos al registro protectora o al registro de usuario
    // if (tipo == 'protectora') {
    //   const emailUser = await Protectora.findOne({ email: email });
    //   if (emailUser) {
    //     req.flash('error', "The Email is already in use.");
    //     res.redirect("/users/signup");
    //   } else {
    //     const newUser = new User({ email, password, tipo });
    //     newUser.password = await newUser.encryptPassword(password);
    //     await newUser.save();
    //     req.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
    //     res.redirect("/");
    //   }
    // } else {
    //   const emailUser = await Adoptante.findOne({ email: email });
    //   if (emailUser) {
    //     req.flash('error', "The Email is already in use.");
    //     res.redirect("/users/signup");
    //   } else {
    //     const newUser = new User({ email, password, tipo });
    //     newUser.password = await newUser.encryptPassword(password);
    //     await newUser.save();
    //     req.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
    //     res.redirect("/");
    //   }
    // }
    // const emailUser = await User.findOne({ email: email });
    // if (emailUser) {
    //   req.flash('error', "The Email is already in use.");
    //   res.redirect("/users/registro");
    // } else {
    //   const newUser = new User({ email, password, tipo });
    //   newUser.password = await newUser.encryptPassword(password);
    //   await newUser.save();
    //   req.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
    //   res.redirect("/");
    // }
  // }
};

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

const renderLogin = (request, response) => {
  response.render('users/login')
}

// const login = (request, response) => {

//   response.render('users/login')
// }

const login = passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
})

module.exports = {renderRegistro, registro, renderRegistroProtectora, registroProtectora, renderLogin, login}