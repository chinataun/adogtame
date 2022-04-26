const Adoptante = require('../models/Adoptante')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const {validateAdoptante} = require('../utils/service.validations.user.adoptante')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const {promisify} = require('util')
const unlinkAsync = promisify(fs.unlink)

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  const { email, dni, telefono, descripcion, nombre, password, role} = request.body;
  const {file,body} = request
  let imageUploaded = body.imageHidden;
  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    if (file && !validation.image) {
      try {
        if (imageUploaded != ''){
          await unlinkAsync("public/uploads/" + imageUploaded)
        }
      } catch (error) {
        request.flash('success_msg', error)
        return response.render('users/signup_protectora', {errors: validation, email, dni, telefono, descripcion, nombre, password, role, imageUploaded, error})
      }

      
      imageUploaded = file.filename;
    }
    return response.render('users/signup_adoptante', {errors: validation, email, dni, telefono, descripcion, nombre, password,role,imageUploaded})
  }
  if(file && imageUploaded != file.filename){
       try {
         if (imageUploaded != ''){
           await unlinkAsync("public/uploads/" + imageUploaded)
         }
       } catch (error) {
         request.flash('success_msg', error)
         return response.render('users/signup_protectora', {errors: validation, email, dni, telefono, descripcion, nombre, password, role, imageUploaded, error})
       }
     }

  const newAdoptante = new Adoptante({ 
    nombre: nombre, 
    dni: dni, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? imageUploaded : file.filename,
  });
  const adoptantesaved = await newAdoptante.save();

  const newUser = new User({
    email: email,
    password: password,
    role: role,
    user: adoptantesaved,
  })
  newUser.password = await newUser.encryptPassword(password);
  const userSaved = await newUser.save();
  const token = jwt.sign({user:userSaved}, 'SECRET', {expiresIn: "24h"});
  response.cookie('token', token, {
    httpOnly: true
  });

  // request.flash("success_msg", `Usuario ${role} con email: ${email} registrado`);
  response.redirect('/')
}


const renderAdoptantes = async (request, response) => {
  const Adoptantes = await Adoptante.find({}) 
  response.render('users/adoptantes', {Adoptantes})
}

const renderAdoptante = async (request, response) => {
  const { id } = request.params
  const userAdoptante = await User.findById(id).populate('user')
  response.render('users/adoptante', {adoptante: userAdoptante, activeProtectora:'active'})

}

const renderSolicitudesAdoptante = async (request, response) => {
  const user = request.user
  const solicitudes = await Solicitud.find({adoptante: user.id}).populate('animal protectora').populate([{
    path: 'protectora',
    model: 'User',
    populate: {
      path: 'user',
      model: 'Protectora'
    }
  }])
  response.render('users/solicitudes_adoptante', {solicitudes, activeAdoptante:'active'})

}

const renderEditAdoptante = async (request, response) => {
  const {user} = request.user
  const adoptante = await User.findById(user._id).populate('user')
  response.render('users/edit_adoptante', {adoptante, activeAdoptante:'active'})
}

const editAdoptante = async (request, response, error) => {
  const {user} = request.user
  const { email, dni, telefono, descripcion, nombre} = request.body;
  const {file,body} = request
  const validation = validateAdoptante(request)
  if (Object.keys(validation).length !== 0) {
    const adoptanteBody = body
    const adoptanteFound = await User.findById(user._id).populate('user')

    if (file && !validation.image) {
      try {
        await unlinkAsync("public/uploads/" + adoptanteFound.user.image)

      } catch (err) {
        console.log(err);
      }
      adoptanteFound.user.image = file.filename;
      await adoptanteFound.user.save();
    }

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
    return response.render('users/edit_adoptante', {errors: validation, adoptante, activeAdoptante:'active'})
  }
  if (file) {
    const adoptanteFound = await User.findById(user._id).populate('user')
    try {
      await unlinkAsync("public/uploads/" + adoptanteFound.user.image)
    } catch (err) {
      console.log(err);
    }
    adoptanteFound.user.image = file.filename;
    await adoptanteFound.user.save();
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


  request.flash("success_msg", `Usuario actualizado`);
  response.redirect('/users/adoptante/' + user._id)
}

module.exports = {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante, renderSolicitudesAdoptante, renderEditAdoptante, editAdoptante}