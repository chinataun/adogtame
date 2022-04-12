const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const validatorAdoptante = require('../utils/service.validations.user')

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  let errors = [];
  const { email, cif, telefono, descripcion, nombre, password, role } = request.body;
  const {file} = request
  console.log(file)
  let tipo = 'adoptante'
  // if (!validatorAdoptante.validateNombreAdoptante(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorAdoptante.validateTelefonoAdoptante(telefono)
  // const validation = validatorAdoptante.validateAdoptante(request)
  // if (validation.length !== 0) {
  //   return response.render('users/signup_adoptante', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  // }
  const newAdoptante = new Adoptante({ 
    nombre: nombre, 
    cif: cif, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  });
  const adoptantesaved = await newAdoptante.save();

  const newUser = new User({
    email: email,
    password: password,
    role: role,
    references: adoptantesaved,
  })
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();

  request.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
  response.redirect('/users/login')
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
  console.log(solicitudes);
  console.log(user);
  response.render('users/solicitudes_adoptante', {solicitudes})

}

module.exports = {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante, renderSolicitudesAdoptante}