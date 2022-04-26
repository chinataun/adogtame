const Protectora = require('../models/Protectora')
const User = require('../models/User')
const Solicitud = require('../models/Solicitud')
const {validateProtectora} = require('../utils/service.validations.user.protectora')
const token = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const {promisify} = require('util')
const unlinkAsync = promisify(fs.unlink)

const renderRegistroProtectora =  (request, response) => 
{
  response.redirect('/users/registro')
}

const registroProtectora = async (request, response) => 
{
  const { email, cif, telefono, descripcion, nombre, password, role, ciudad } = request.body;
  const {file, body} = request
  let imageUploaded = body.imageHidden;
  const validation = validateProtectora(request)
  if (Object.keys(validation).length !== 0) {

    if (file && !validation.image) {
      try {
        if (imageUploaded != ''){
          await unlinkAsync("public/uploads/" + imageUploaded)
        }
      } catch (error) {
        request.flash('success_msg', error)
        return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, ciudad, password, role, imageUploaded, error})
      }

      
      imageUploaded = file.filename;
    }
    return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, ciudad, password, role, imageUploaded})
  }

  if(file && imageUploaded != file.filename){
      try {
        if (imageUploaded != ''){
          await unlinkAsync("public/uploads/" + imageUploaded)
        }
      } catch (error) {
        request.flash('success_msg', error)
        return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, ciudad, password, role, imageUploaded, error})
      }
    }

  const newProtectora = new Protectora({ 
    nombre: nombre,
    cif: cif, 
    telefono: telefono, 
    ciudad: ciudad,
    descripcion: (descripcion == '') ? undefined : descripcion,
    image: (file == undefined) ? imageUploaded : file.filename,
  }); 

  const protectorasaved = await newProtectora.save();
  const newUser = new User({
    email: email,
    password: password,
    role: role,
    user: protectorasaved,
  })
  newUser.password = await newUser.encryptPassword(password);
  const userSaved = await newUser.save();
  const token = jwt.sign({user:userSaved}, 'SECRET', {expiresIn: "24h"});

  response.cookie('token', token, 
  {
    httpOnly: true
  });

  response.redirect('/')
}

const renderProtectoras = async (request, response) => 
{
  const protectoras = await User.find({role: 'Protectora'}).populate('user')
  const protectoras_filtrado_ciudad = await Protectora.collection.distinct("ciudad")
  response.render('users/protectoras', {protectoras,protectoras_filtrado_ciudad, activeProtectora:'active'})
}

const busquedaProtectoras = async (request, response) => 
{
  const protectoras_filtrado_ciudad = await Protectora.collection.distinct("ciudad")
  const {body} = request

  if (body.submit === 'filtrar') {
    const {ciudad} = request.body
    let usersProtectorar = [];
    const protectoras = await User.find().populate('user').populate([{
      path: 'user',
      model: 'Protectora',
      match: {
        ciudad: ciudad
      }}])

      const userProtectoras = protectoras.filter(function(user) {

            return user.user; 
          });
    return response.render('users/protectoras', { protectoras: userProtectoras, activeAnimales:'active', protectoras_filtrado_ciudad})

  } 

  if (body.submit === 'Buscar') {
    console.log(body);
    const {busqueda} = request.body
    console.log(busqueda);
    const protectoras = await User.find({role: 'Protectora'}).populate({
      path: 'user',
      model: 'Protectora',
      match: 
      {
        "$or": [
          { 'nombre': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'descripcion': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'ciudad': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
        ]
      }})
      const userProtectoras = protectoras.filter(function(user) {
            return user.user; 
          });

    return response.render('users/protectoras', { protectoras: userProtectoras, activeAnimales:'active', protectoras_filtrado_ciudad})

  }  
}

const renderProtectora = async (request, response) => {
  const { id } = request.params
  const protectoraRender = await User.findById(id).populate('user').populate([{
    path: 'user',
    model: 'Protectora',
    populate: {
      path: 'animales',
      model: 'Animal'
    }
  }])
  let animales = protectoraRender.user.animales;

  response.render('users/protectora', {protectoraRender: protectoraRender, animales})
}

const renderSolicitudesProtectora = async (request, response) => {
  const user = request.user
  const solicitudes = await Solicitud.find({protectora: user.id}).populate('animal').populate([{
    path: 'adoptante',
    model: 'User',
    populate: {
      path: 'user',
      model: 'Adoptante'
    }
  }])
  response.render('users/solicitudes_protectora', {solicitudes, activeProtectora:'active'})

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

const renderEditProtectora = async (request, response) => {
  const user = request.user
  const protectora = await User.findById(user.id).populate('user')
  console.log(protectora);
  response.render('users/edit_protectora', {protectora, activeProtectora:'active'})
}

const editProtectora = async (request, response, error) => {
  const user = request.user
  const { email, cif, telefono, descripcion, nombre, password, role, ciudad } = request.body;
  const {file,body} = request
  const validation = validateProtectora(request)
  if (Object.keys(validation).length !== 0) {
    const protectoraBody = body
    const protectoraFound = await User.findById(user.id).populate('user')

    if (file && !validation.image) {
      try {
        await unlinkAsync("public/uploads/" + protectoraFound.user.image)

      } catch (err) {
        console.log(err);
      }
      protectoraFound.user.image = file.filename;
      await protectoraFound.user.save();
    }


    const protectora = {
      email: email,
      user: {
        nombre: nombre,
        cif: cif, 
        telefono: telefono, 
        ciudad: ciudad,
        descripcion: descripcion,
        image: (file == undefined) ? protectoraFound.user.image : file.filename,
      }
    }
    return response.render('users/edit_protectora', {errors: validation, protectora, activeProtectora:'active'})
  }
  if (file) {
    const protectoraFound = await User.findById(user.id).populate('user')
    try {
      await unlinkAsync("public/uploads/" + protectoraFound.user.image)
    } catch (err) {
      console.log(err);
    }
    protectoraFound.user.image = file.filename;
    await protectoraFound.user.save();
  }

  const newProtectora = { 
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
  await User.findByIdAndUpdate(user.id, newUser);
  await Protectora.findByIdAndUpdate(user.user, newProtectora);


  request.flash("success_msg", `Usuario actualizado`);
  response.redirect('/users/protectora/' + user.id)
}

module.exports = {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora,renderSolicitudesProtectora,procesarSolicitudAdopcion,renderEditProtectora,editProtectora}