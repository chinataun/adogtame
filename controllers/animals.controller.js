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
  response.render('animales/animales', { animales, animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza, animales_filtrado_ciudad })
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/add')
}

const busquedaAnimal = async (request, response) => {

  const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
  const animales_filtrado_genero = await Animal.collection.distinct("genero")
  const animales_filtrado_raza = await Animal.collection.distinct("raza")
  const animales_filtrado_ciudad = await Animal.collection.distinct("ciudad")

  // Aqui finimos el tipo de busqueda y resultado a obtener:   console.log("Aqui definimos el tipo de busqueda"); console.log(Buscar);
  const { Buscar } = request.body

  // Aqui obtenemos los valores del formulario:   console.log("Aqui obtenemos los datos de registro de busqueda");
  const { busqueda } = request.body //console.log(busqueda);console.log(busqueda[0]);console.log(busqueda[1]);console.log(busqueda[2]);console.log(busqueda[3]);console.log(busqueda[4]);console.log(busqueda[5]);

  if (Buscar === "filtrado general") {
    console.log("************************         filtrado general         ************************");
    console.log(busqueda);

    Animal.find
      ({
        "$or": [
          { 'tipo': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'genero': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'raza': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'descripcion': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
          { 'ciudad': { "$regex": '.*' + busqueda.toLowerCase() + '.*', "$options": "i" } },
        ]
      })
      .then(animales => {
        if (animales)
          response.render('animales/animales', { animales, animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza })
      })
      .catch(err => next(err))
  }
  else {
    console.log("************************         filtrado general         ************************");
    console.log(busqueda);

    if (busqueda[0].toLowerCase() === "todos los tipos") { busqueda[0] = ""; }
    if (busqueda[1].toLowerCase() === "todos los generos") { busqueda[1] = ""; }

    console.log("************************");
    console.log(busqueda);

    Animal.find
      (
        {
          'tipo': { "$regex": '.*' + busqueda[0].toLowerCase() + '.*', "$options": "i" },
          'genero': { "$regex": '.*' + busqueda[1].toLowerCase() + '.*', "$options": "i" },
          'descripcion': { "$regex": '.*' + busqueda[5].toLowerCase() + '.*', "$options": "i" },
          'edad': { '$gt': busqueda[3], '$lt': busqueda[4] }
        }
      )
      .then(animales => {
        if (animales)
          response.render('animales/animales', { animales, animales_filtrado_tipo, animales_filtrado_genero, animales_filtrado_raza })
      })
      .catch(err => next(err))
  }
}

// {'descripcion' : {$regex : busqueda[0]}},

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
    return response.render('animales/add', { errors: validation, body, checked, imageUploaded, historialUploaded })
  }

  try {
    const animal = new Animal({
      nombre: body.nombre,
      tipo: body.tipo,
      raza: body.raza,
      edad: body.edad,
      genero: body.genero,
      historial: (!files.historial) ? historialUploaded : files.historial[0].filename,
      descripcion: body.descripcion,
      image: (!files.image) ? imageUploaded : files.image[0].filename,
      protectora: user.user.user._id,
      ciudad: user.user.user.ciudad,
    })
    const savedAnimal = await animal.save()
    const userfound = await User.findById(user.user._id).populate('user')
    const protectoraf = await Protectora.findById(userfound.user._id)
    protectoraf.animales = await protectoraf.animales.concat(savedAnimal._id)
    await protectoraf.save()
    return response.redirect('/animales/animal/' + savedAnimal._id)
  } catch (error) {
    response.render('animales/add')
  }
}

const renderAnimal = async (request, response) => {
  const { id } = request.params
  const { user } = request.user
  const animal = await Animal.findById(id).populate('protectora')
  if (animal) {
    if (!user) {
      response.redirect('/animales')
    } else {
      let canEdit = (user.user._id === animal.protectora.id)
        ? true
        : false;
      const solicitado = await Solicitud.find({ adoptante: user._id, animal: id })
      return response.render('animales/animal', { animal, solicitado, canEdit })
    }
    return response.render('animales/animal', { animal })
  }
}

const solicitudAnimal = async (request, response) => {
  const { animal, mensaje } = request.body
  const user = request.user
  const animalfound = await Animal.findById(animal)
  const protectora = await animalfound.populate('protectora')
  const solicitud = new Solicitud({
    animal: animalfound._id,
    adoptante: user.user._id,
    mensajeAdoptante: mensaje,
    mesanjeProtectora: undefined,
    protectora: protectora.protectora._id,
    estado: 'En proceso'
  })
  const saved = await solicitud.save()
  request.flash("success_msg", 'Solicitud enviada correctamente.')
  response.redirect('/animales/animal/' + animal)
}

const deleteAnimal = async (request, response) => {
  const id = request.params.id
  const animaldeleted = await Animal.findByIdAndDelete(id).populate('protectora')
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
  const { id } = request.query

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
  response.render('animales/edit', { animal, checkedH, checkedM })
}

const editAnimal = async (request, response, error) => {
  const { file, body } = request
  const { id } = request.params
  const validation = validateAnimal(request)

  if (Object.keys(validation).length !== 0) {
    const animal = body
    const animalFound = await Animal.findById(id)
    animal.id = id;
    animal.image = (file == undefined) ? animalFound.image : file.filename;
    if (file && !validation.image) {
      try {
        await unlinkAsync("public/uploads/" + animalFound.image)
      } catch (err) {
        console.log(err);
      }
      animalFound.image = file.filename;
      await animalFound.save();
    }

    let checkedH;
    let checkedM;
    if (body.genero === "Hembra") {
      checkedH = 'checked'
    } else if (body.genero === "Macho") {
      checkedM = 'checked'
    }
    return response.render('animales/edit', { errors: validation, animal, checkedH, checkedM })
  }
  if (file) {
    const animalFound = await Animal.findById(id)
    try {
      await unlinkAsync("public/uploads/" + animalFound.image)
    } catch (err) {
      console.log(err);
    }
    animalFound.image = file.filename;
    await animalFound.save();
  }
  try {
    const animal = {
      nombre: body.nombre,
      tipo: body.tipo,
      raza: body.raza,
      edad: body.edad,
      genero: body.genero,
      historial: body.descripcion,
      image: (file == undefined) ? file : file.filename,
      descripcion: body.descripcion,

    }
    let animalUpdated = await Animal.findByIdAndUpdate(id, animal);

    request.flash('success_msg', 'Editado con éxito')
    response.redirect('/animales/animal/' + animalUpdated._id)
  } catch (error) {
    response.render('animales/edit')
  }
}


module.exports = { renderAnimales, renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal, solicitudAnimal, deleteAnimal, renderEditAnimal, editAnimal }
