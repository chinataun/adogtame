const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const {validateAdoptante} = require('../utils/service.validations.user.adoptante')

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  const { email, dni, telefono, descripcion, nombre, password, role } = request.body;
  const {file} = request

  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    return response.render('users/signup_adoptante', {errors: validation, email, dni, telefono, descripcion, nombre, password})
  }

  const newAdoptante = new Adoptante({ 
    nombre: nombre, 
    dni: dni, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  });
  const adoptantesaved = await newAdoptante.save();

  const newUser = new User({
    email: email,
    password: password,
    role: role,
    user: adoptantesaved._id,
  })
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/users/login')
}

module.exports = {renderRegistroAdoptante, registroAdoptante}