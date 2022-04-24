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
  const protectora_filtrado_ciudad = await Protectora.collection.distinct("ciudad")
  response.render('users/protectoras', {protectoras,protectora_filtrado_ciudad})
}

const busquedaProtectoras = async (request, response) => 
{
  const protectoras = await User.find({role: 'Protectora'}).populate('user') 
  const protectora_filtrado_ciudad = await Protectora.collection.distinct("ciudad")
  const {busqueda} = request.body
  const {buscar} = request.body

  if (buscar.toLowerCase() === "busqueda general") 
  {
    console.log("************************         filtrado general         ************************");
    console.log(busqueda);

    Protectora.find
    ({
        "$or": 
        [
          {'nombre': { "$regex" : '.*' +  busqueda.toLowerCase() + '.*' , "$options": "i"  } },
          {'ciudad': { "$regex" : '.*' +  busqueda.toLowerCase() + '.*' , "$options": "i"  } },
        ]  
    })
    .then(protectoras => 
    {
        if (protectoras)
        {
          response.render('users/protectoras', {protectoras, protectora_filtrado_ciudad})
        }
        
    })
    .catch(err => next(err))

  } 
  else 
  {
    console.log("************************         filtrado avanzada         ************************");
    
    if (busqueda[0].toLowerCase() === "mostras todas las ciudades") { busqueda[0] = ""; }

    Protectora.find
    ({
      'descripcion' : { "$regex" : '.*' +  busqueda[1].toLowerCase() + '.*'  , "$options": "i" }, 
      'ciudad' : { "$regex" : '.*' +  busqueda[0].toLowerCase() + '.*'  , "$options": "i"  }    
    })
    .then(protectoras => 
    {
      if (protectoras)
      {
        response.render('users/protectoras', {protectoras, protectora_filtrado_ciudad })
      }   
    })
    .catch(err => next(err)) 
  }

  
}

const renderProtectora = async (request, response) => {
  const { id } = request.params
  const protectora = await User.findById(id).populate('user')
  let animales = protectora.user.animales;

  response.render('users/protectora', {protectora, animales})
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

const renderEditProtectora = async (request, response) => {
  const {user} = request.user
  const protectora = await User.findById(user._id).populate('user')
  response.render('users/edit_protectora', {protectora})
}

const editProtectora = async (request, response, error) => {
  const {user} = request.user
  const { email, cif, telefono, descripcion, nombre, password, role, ciudad } = request.body;
  const {file,body} = request
  const validation = validateProtectora(request)
  if (Object.keys(validation).length !== 0) {
    const protectoraBody = body
    const protectoraFound = await User.findById(user._id).populate('user')

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
    return response.render('users/edit_protectora', {errors: validation, protectora})
  }
  if (file) {
    const protectoraFound = await User.findById(user._id).populate('user')
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
  await User.findByIdAndUpdate(user._id, newUser);
  await Protectora.findByIdAndUpdate(user.user, newProtectora);


  request.flash("success_msg", `Usuario actualizado`);
  response.redirect('/users/protectora/' + user._id)
}

module.exports = {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora,renderSolicitudesProtectora,procesarSolicitudAdopcion,renderEditProtectora,editProtectora}