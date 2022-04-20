const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const {validateAdoptante} = require('../utils/service.validations.user.adoptante')
const jwt = require('jsonwebtoken')

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  const { email, dni, telefono, descripcion, nombre, password, role} = request.body;
  const {file} = request
  // if (!validatorAdoptante.validateNombreAdoptante(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorAdoptante.validateTelefonoAdoptante(telefono)
  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    return response.render('users/signup_adoptante', {errors: validation, email, dni, telefono, descripcion, nombre, password,role})
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
  const userSaved = await newUser.save();
  const token = jwt.sign({user:userSaved}, 'SECRET', {expiresIn: "24h"});
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
  const userAdoptante = await User.findById(id).populate('user')
  response.render('users/adoptante', {adoptante: userAdoptante})

  // User.findById(id).populate('user')
  //   .then(protectora => {
  //     if (protectora)
  //     console.log(protectora.user.populate('animales'));

  //     response.render('users/protectora', {protectora, animales})
  //   })
  //   .catch(err => next(err))

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
  const {file} = request
  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    const protectoraFound = await User.findById(user._id).populate('user')
    const adoptante = {
      email: email,
      user: {
        nombre: nombre,
        dni: dni, 
        telefono: telefono, 
        descripcion: descripcion,
        image: protectoraFound.user.image,
      }

    }
    return response.render('users/edit_adoptante', {errors: validation, adoptante})
  }
  const adoptanteUpdated = { 
    nombre: nombre,
    cif: cif, 
    telefono: telefono, 
    ciudad: ciudad,
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? file : file.filename,
  };   
  const newUser = {
    email: email
  };
  await User.findByIdAndUpdate(user._id, newUser);
  await Protectora.findByIdAndUpdate(user.user, adoptanteUpdated);


  request.flash("success_msg", `Usuario actualizado`);
  response.redirect('/users/adoptante/' + user._id)
}

module.exports = {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante, renderSolicitudesAdoptante, renderEditAdoptante, editAdoptante}