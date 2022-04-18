const Protectora = require('../models/Protectora')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const {validateProtectora} = require('../utils/service.validations.user.protectora')

const renderRegistroProtectora =  (request, response) => {

  response.redirect('/users/registro')
}

const registroProtectora = async (request, response) => {
  const { email, cif, telefono, descripcion, nombre, password, role, ciudad } = request.body;
  const {file} = request

  const validation = validateProtectora(request)
  if (Object.keys(validation).length !== 0) {
    return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, ciudad, password})
  }

  const newProtectora = new Protectora({ 
    nombre: nombre,
    cif: cif, 
    telefono: telefono, 
    ciudad: ciudad,
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  }); 
  const protectorasaved = await newProtectora.save();
  
  const newUser = new User({
    email: email,
    password: password,
    role: role,
    user: protectorasaved._id,
  })
  newUser.password = await newUser.encryptPassword(password);
  const userSaved = await newUser.save();
  

  request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/')
}


const renderProtectoras = async (request, response) => {
  const protectoras = await User.find({role: 'Protectora'}).populate('user') 
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
  const userProtectora = await User.findById(id).populate('user')
  const animalsByProtectora = await userProtectora.user.populate('animales')
  response.render('users/protectora', {protectora: userProtectora, animales : animalsByProtectora.animales})

}

const renderSolicitudesProtectora = async (request, response) => {
  const {user} = request.user
  const solicitudes = await Solicitud.find({protectora: user._id}).populate('animal adoptante').populate([{
    path: 'adoptante',
    model: 'User',
    populate: {
      path: 'user',
      model: 'Adoptante'
    }
  }])
  response.render('users/solicitudes_protectora', {solicitudes})

}

const procesarSolicitudAdopcion = async (request, response) => {
  const {idSolicitud, mensaje, submit} = request.body
  const solicitud = await Solicitud.findById(idSolicitud);

  solicitud.mensajeProtectora = mensaje
  if (submit === 'rechazar') {
    solicitud.estado = 'rechazada'
  } else if (submit === 'aceptar'){
    solicitud.estado = 'aceptada'
  }

  const solicitudSaved = await solicitud.save();

  response.redirect('/users/solicitudesProtectora')

}

module.exports = {renderRegistroProtectora, registroProtectora, renderProtectoras,renderSolicitudesProtectora, busquedaProtectoras, renderProtectora,procesarSolicitudAdopcion}