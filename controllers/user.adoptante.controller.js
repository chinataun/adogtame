const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
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
  const userSaved =  await newUser.save();

  request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/')
}

const renderAdoptante = async (request, response) => {
  const { id } = request.params
  const userAdoptante = await User.findById(id).populate('user')
  response.render('users/adoptante', {adoptante: userAdoptante})
}

const renderSolicitudesAdoptante = async (request, response) => {
  const {user} = request.user
  const solicitudes = await Solicitud.find({adoptante: user._id}).populate('animal protectora').populate([{
    path: 'protectora',
    model: 'User',
    populate: {
      path: 'user',
      model: 'Protectora'
    }
  }])
  console.log(solicitudes);
  response.render('users/solicitudes_adoptante', {solicitudes})

}
const renderEditAdoptante = async (request, response) => {
  const {user} = request.user
  const adoptante = await User.findById(user._id).populate('user')
  response.render('users/edit_adoptante', {adoptante})
}

const editAdoptante = async (request, response, error) => {
  const {user} = request.user
  const { email, dni, telefono, descripcion, nombre} = request.body;
  const {file,body} = request
  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    const adoptanteBody = body
    const adoptanteFound = await User.findById(user._id).populate('user')

    const adoptante = {
      email: email,
      user: {
        nombre: nombre,
        dni: dni, 
        telefono: telefono, 
        descripcion: descripcion,
        image: (file == undefined) ? adoptanteFound.user.image : file.filename,
      }

    }
    return response.render('users/edit_adoptante', {errors: validation, adoptante})
  }
const adoptanteUpdated = { 
    nombre: nombre,
    dni: dni, 
    telefono: telefono,
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  };
  const newUser = {
    email: email
  };
  await User.findByIdAndUpdate(user._id, newUser);
  await Adoptante.findByIdAndUpdate(user.user, adoptanteUpdated);

  response.redirect('/users/adoptante/' + user._id)
}

module.exports = {renderRegistroAdoptante, registroAdoptante,renderAdoptante, renderSolicitudesAdoptante, renderEditAdoptante,editAdoptante}