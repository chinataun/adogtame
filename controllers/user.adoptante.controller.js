const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const validatorAdoptante = require('../utils/service.validations.user')
const jwt = require('jsonwebtoken')

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  let errors = [];
  const { email, dni, telefono, descripcion, nombre, password, role } = request.body;
  const {file} = request
  // if (!validatorAdoptante.validateNombreAdoptante(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorAdoptante.validateTelefonoAdoptante(telefono)
  // const validation = validatorAdoptante.validateAdoptante(request)
  // if (validation.length !== 0) {
  //   return response.render('users/signup_adoptante', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  // }
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
  const token = jwt.sign({newUser}, 'SECRET', {expiresIn: "24h"});

  response.cookie('token', token, {
    httpOnly: true
  });
  request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/')
}


const renderAdoptantes = async (request, response) => {
  const Adoptantes = await Adoptante.find({}) 
  response.render('users/adoptantes', {Adoptantes})
}

const renderAdoptante = async (request, response) => {
  const { id } = request.params

  Adoptante.findById(id)
    .then(Adoptante => {
      if (Adoptante)
      response.render('users/adoptante', {Adoptante})
    })
    .catch(err => next(err))

}

const renderSolicitudesAdoptante = async (request, response) => {
  const {user} = request.user
  const solicitudes = await Solicitud.find({adoptante: user._id}).populate('animal')

  response.render('users/solicitudes_adoptante', {solicitudes})

}

const renderEditAdoptante = async (request, response) => {
  const {user} = request.user
  const solicitudes = await Solicitud.find({adoptante: user._id}).populate('animal')

  response.render('users/solicitudes_adoptante', {solicitudes})
}

const editAdoptante = async (request, response, error) => {

  const {user} = request.user
  const solicitudes = await Solicitud.find({adoptante: user._id}).populate('animal')

  response.render('users/solicitudes_adoptante', {solicitudes})
}

module.exports = {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante, renderSolicitudesAdoptante, renderEditAdoptante, editAdoptante}