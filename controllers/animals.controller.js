const Animal = require('../models/Animal')
const Protectora = require('../models/Protectora')
const Solicitud = require('../models/Solicitud')
const User = require('../models/User')
const { validateAnimal } = require('../utils/service.validations.animales')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


const renderAnimales = async (request, response) => {
  const animales = await Animal.find({})
  const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
  const animales_filtrado_genero = await Animal.collection.distinct("genero")
  const animales_filtrado_raza = await Animal.collection.distinct("raza")
  const animales_filtrado_ciudad = await Protectora.collection.distinct("ciudad")
  response.render('animales/animales', { animales, activeAnimales:'active', animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza, animales_filtrado_ciudad })
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/add')
}

const busquedaAnimal = async (request, response) => {

  const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
  const animales_filtrado_genero = await Animal.collection.distinct("genero")
  const animales_filtrado_raza = await Animal.collection.distinct("raza")
  const animales_filtrado_ciudad = await Animal.collection.distinct("ciudad")
  const {body} = request
  const { busqueda } = request.body 
  if (body.submit === 'filtrar') {
    console.log('');
    let busqueda = {}
    if (body.tipo != '') {
      busqueda.tipo = body.tipo
    }
    if (body.raza != '') {
     busqueda.raza = body.raza 
    }
    if (body.ciudad != '') {
      busqueda.ciudad = body.ciudad 
     }
     busqueda.edad =  { '$gt': body.busqueda[0], '$lt': body.busqueda[1] }

    const animales = await Animal.find(busqueda)
    return response.render('animales/animales', { animales, activeAnimales:'active', animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza,animales_filtrado_ciudad })

  }
  if (body.submit === 'Buscar') {
    
    const animales = await Animal.find
    (
      {
        "$or": 
        [
          { 'tipo': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'genero': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'raza': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'descripcion': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'ciudad': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
        ]
      }
    )
    return response.render('animales/animales', { animales, activeAnimales:'active', animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza,animales_filtrado_ciudad })
  }  
}


const addAnimal = async (request, response, error) => {

  const { files, body, user } = request
  const validation = validateAnimal(request)
  let imageUploaded = body.imageUploaded;
  let historialUploaded = body.historialUploaded;

  if (Object.keys(validation).length !== 0) {

    if (files.image && !validation.image) {
      if (imageUploaded) {
        try {
          await unlinkAsync("public/uploads/" + imageUploaded)
        } catch (err) {
          console.log(err);
        }
      }
      imageUploaded = files.image[0].filename;
    }
    if (files.historial && !validation.image) {
      if (historialUploaded) {
        try {
          await unlinkAsync("public/uploads/" + historialUploaded)
        } catch (err) {
          console.log(err);
        }
      }
      historialUploaded = files.historial[0].filename;
    }
    let checked = {}
    if (body.genero === "Hembra") {
      checked.checkedH = 'checked'
    } else if (body.genero === "Macho") {
      checked.checkedM = 'checked'
    }
    return response.render('animales/add', { errors: validation,activeProtectora:'active', body, checked, imageUploaded, historialUploaded })
  }
  try {

    const userFound = await User.findById(user.id).populate([{
      path: 'user',
      model: 'Protectora',
      populate: {
        path: 'animales',
        model: 'Animal',
      }
    }])
    const animal = new Animal({
      nombre: body.nombre,
      tipo: body.tipo,
      raza: body.raza,
      edad: body.edad,
      genero: body.genero,
      historial: (!files.historial) ? historialUploaded : files.historial[0].filename,
      descripcion: body.descripcion,
      image: (!files.image) ? imageUploaded : files.image[0].filename,
      protectora: user.id,
      ciudad: userFound.user.ciudad,
    })
    const savedAnimal = await animal.save()
    const protectoraFound = await Protectora.findById(userFound.user._id)
    protectoraFound.animales = await protectoraFound.animales.concat(savedAnimal._id)
    await protectoraFound.save()
    return response.redirect('/animales/animal/' + savedAnimal._id)
  } catch (error) {
    response.render('animales/add')
  }
}

const renderAnimal = async (request, response) => {
  const { id } = request.params
  const user = request.user
  const animal = await Animal.findById(id).populate([{
    path: 'protectora',
    model: 'User',
  }])
  let solicitado = undefined;
  if (!user) {
    canEdit = false;
  } else {
    canEdit = (user.id == animal.protectora._id)
    solicitado = await Solicitud.find({ adoptante: user.id, animal: id })
  }
  return response.render('animales/animal', { animal, solicitado, canEdit })
}

const solicitudAnimal = async (request, response) => {
  const { animal, mensaje } = request.body
  const user = request.user
  const animalfound = await Animal.findById(animal).populate([{
    path: 'protectora',
    model: 'User',
  }])
  const solicitud = new Solicitud({
    animal: animalfound._id,
    adoptante: user.id,
    mensajeAdoptante: mensaje,
    mesanjeProtectora: undefined,
    protectora: animalfound.protectora,
    estado: 'En proceso'
  })
  await solicitud.save()
  request.flash("success_msg", 'Solicitud enviada correctamente.')
  response.redirect('/animales/animal/' + animal)
}

const deleteAnimal = async (request, response) => {
  const id = request.params.id
  const animaldeleted = await Animal.findByIdAndDelete(id).populate([{
    path: 'protectora',
    model: 'User',
  }])
  console.log(animaldeleted);
  try {
    await unlinkAsync("public/uploads/" + animaldeleted.image)
  } catch (err) {
    console.log(err);
  }
  const protectoraf = await Protectora.findById(animaldeleted.protectora.user._id)
  const index = protectoraf.animales.indexOf(animaldeleted._id);
  if (index > -1) {
    protectoraf.animales.splice(index, 1); // 2nd parameter means remove one item only
  }
  await protectoraf.save()

  response.redirect('/users/protectora/' + animaldeleted.protectora._id)
}


const renderEditAnimal = async (request, response) => {
  const { id } = request.params
  const animal = await Animal.findById(id)
  // console.log(animal);
  // if (animal) {
  //   if (request.user !== undefined) {
  //     const {user} = request.user
  //     const solicitado = await Solicitud.find({adoptante: user._id, animal: id})
  //     return response.render('animales/animal', {animal, solicitado})
  //   }
  //   return response.render('animales/animal', {animal})
  // } else{
  let checkedH;
  let checkedM;
  if (animal.genero === "Hembra") {
    checkedH = 'checked'
  } else if (animal.genero === "Macho") {
    checkedM = 'checked'
  }
  // }
  response.render('animales/edit', { animal, checkedH, checkedM,activeProtectora:'active' })
}

const editAnimal = async (request, response, error) => {
  const { files, body } = request
  const { id } = request.params
  const validation = validateAnimal(request)

  let imageUploaded = body.imageUploaded;
  let historialUploaded = body.historialUploaded;

  if (Object.keys(validation).length !== 0) {
    const animal = body
    const animalFound = await Animal.findById(id)
    animal.id = id;
    console.log(files.image);
    console.log(files.historial);
    console.log(files);
      animal.image = (files.image == undefined) ? animalFound.image : files.image[0].filename;
      animal.historial = (files.historial == undefined) ? animalFound.historial : files.historial[0].filename;  

   
    if (Object.keys(files).length !== 0 && !validation.image) {
      try {
          if (files.image) {
            await unlinkAsync("public/uploads/" + animalFound.image)
            animalFound.image = files.image[0].filename;
          }
          if (files.historial) {
            await unlinkAsync("public/uploads/" + animalFound.historial)
            animalFound.historial = files.historial[0].filename;
          }

      } catch (err) {
        console.log(err);
      }   
      await animalFound.save();
    }

    let checkedH;
    let checkedM;
    if (body.genero === "Hembra") {
      checkedH = 'checked'
    } else if (body.genero === "Macho") {
      checkedM = 'checked'
    }
    return response.render('animales/edit', { errors: validation, animal, checkedH, checkedM,activeProtectora:'active' })
  }
  const animalFound = await Animal.findById(id)
  if (Object.keys(files).length !== 0) {

    try {
      if (files.image) {
        await unlinkAsync("public/uploads/" + animalFound.image)
        animalFound.image = files.image[0].filename;
      }
      if (files.historial) {
        await unlinkAsync("public/uploads/" + animalFound.historial)
        animalFound.historial = files.historial[0].filename;
      }
    } catch (err) {
      console.log(err);
    }   
    await animalFound.save();

  }
  
  try {
    const animal = {
      nombre: body.nombre,
      tipo: body.tipo,
      raza: body.raza,
      edad: body.edad,
      genero: body.genero,
      image : (files.image == undefined) ? animalFound.image : files.image[0].filename,
      historial: (files.historial == undefined) ? animalFound.historial : files.historial[0].filename,
      descripcion: body.descripcion,
    }
    let animalUpdated = await Animal.findByIdAndUpdate(id, animal);
    response.redirect('/animales/animal/' + animalUpdated.id)
  } catch (error) {
    response.render('animales/edit')
  }
}


module.exports = { renderAnimales, renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal, solicitudAnimal, deleteAnimal, renderEditAnimal, editAnimal }
