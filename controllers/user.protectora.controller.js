const Protectora = require('../models/Protectora')
const User = require('../models/User')
const validatorProtectora = require('../utils/service.validations.user')
const token = require('../utils/generateToken')

const renderRegistroProtectora =  (request, response) => {

  response.redirect('/users/registro')
}

const registroProtectora = async (request, response) => {
  let errors = [];
  const { email, cif, telefono, descripcion, nombre, password, role } = request.body;
  const {file} = request
  // if (!validatorProtectora.validateNombreProtectora(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorProtectora.validateTelefonoProtectora(telefono)
  const validation = validatorProtectora.validateProtectora(request)
  if (validation.length !== 0) {
    return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  }
  const newProtectora = new Protectora({ 
    nombre: nombre,
    cif: cif, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  }); 
  const protectorasaved = await newProtectora.save();
  
  const newUser = new User({
    email: email,
    password: password,
    role: role,
    references: protectorasaved,
  })
  newUser.password = await newUser.encryptPassword(password);
  const userSaved = await newUser.save();
  token.tokenSign(userSaved)
  // request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/')
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

const renderSolicitudesProtectora = async (request, response) => {
  const {user} = request.user
  const solicitudes = await Solicitud.find({adoptante: user._id}).populate('animal')
  response.render('users/solicitudes_adoptante', {solicitudes})

}

const procesarSolicitudes = async (request, response) => {
  const { id } = request.params

  Protectora.findById(id)
    .then(protectora => {
      if (protectora)
      response.render('users/protectora', {protectora})
    })
    .catch(err => next(err))

}

module.exports = {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora,renderSolicitudesProtectora,procesarSolicitudes}