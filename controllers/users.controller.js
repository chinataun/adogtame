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
  else {
    if (tipo === 'Protectora') {
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
  const {file} = request
  console.log(file)
  let tipo = 'protectora'
  // if (!validatorProtectora.validateNombreProtectora(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorProtectora.validateTelefonoProtectora(telefono)
  const validation = validatorProtectora.validateProtectora(request)
  if (validation.length !== 0) {
    return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  }
  const newProtectora = new Protectora({ 
    nombre: nombre, 
    email: email, 
    tipo: tipo, 
    cif: cif, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    password: password,
    image: (file == undefined) ? file : file.filename,
  });
  console.log(newProtectora)
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

const renderProtectoras = async (request, response) => {
  const protectoras = await Protectora.find({}) 
  response.render('users/protectoras', {protectoras})
}

const busquedaProtectoras = async (request, response) => {

  const {busqueda} = request.body
  console.log(busqueda);
  Protectora.find({
    'descripcion' : {$regex : busqueda}
  })
  .then(protectoras => {

    if (protectoras)
    response.render('users/protectoras', {protectoras})
  })
  .catch(err => next(err))




}

const renderProtectora = async (request, response) => {
  const { id } = request.params

  Protectora.findById(id)
    .then(protectora => {
      if (protectora)
      response.render('users/protectora', {protectora})
    })
    .catch(err => next(err))

}

module.exports = {renderRegistro, registro,renderRegistroProtectora, registroProtectora,login,renderLogin, renderProtectoras, busquedaProtectoras, renderProtectora}