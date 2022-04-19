const Animal = require('../models/Animal')
const Protectora = require('../models/Protectora')
const Solicitud = require('../models/Solicitud')
const User = require('../models/User')
const {validateAnimal} = require('../utils/service.validations.animales')

const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  const animales_filtrado_tipo = await Animal.collection.distinct("tipo")
const animales_filtrado_genero = await Animal.collection.distinct("genero")
const animales_filtrado_raza = await Animal.collection.distinct("raza")
  response.render('animales/animales', {animales})
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/add')
}

const busquedaAnimal = async (request, response) => {
  console.log(request.query);
  console.log(request.body);

  const {busqueda} = request.body
  console.log(busqueda);
  Animal.find({
    'descripcion' : {$regex : busqueda}
  })
  .then(animales => {

    if (animales)
    console.log(animales);
    response.render('animales/animales', {animales})
  })
  .catch(err => next(err))

}

const addAnimal = async (request, response, error) => {

  const {file, body, nombre, user} = request
  const validation = validateAnimal(request)

  if (Object.keys(validation).length !== 0) {
    let checkedH;
    let checkedM;
    if (body.genero === "Hembra") {
      checkedH = 'checked'
    } else if (body.genero === "Macho") {
      checkedM = 'checked'
    }
    return response.render('animales/add', {errors: validation, body, checkedH, checkedM})
  }

  try {
    const datos = body
    console.log(datos);
    // console.log(body);
    // console.log(file);
    const animal = new Animal({
            nombre: body.nombre,
            tipo: body.tipo,
            raza: body.raza,
            edad: (body.edad == '') ? undefined : body.edad,
            genero: body.genero,
            historial: (body.historial == '') ? undefined : body.historial,
            descripcion: (body.descripcion == '') ? undefined : body.descripcion,
            image: (file == undefined) ? file : file.filename,
            protectora: user.user._id
        })

    const savedAnimal = await animal.save()

    const userfound = await User.findById(user.user._id).populate('user')

    const protectoraf = await Protectora.findById(userfound.user._id)

    protectoraf.animales = await protectoraf.animales.concat(savedAnimal._id)  

    const protectoraUpdates = await protectoraf.save()

    request.flash('success_msg', 'Añadido con éxito')
    return response.redirect('/animales/animal/'+ savedAnimal._id )
  } catch (error) {
    response.render('animales/add')
  }
}

const renderAnimal = async (request, response) => {
  const { id } = request.params
  const animal = await Animal.findById(id).populate('protectora').populate([{
    path: 'protectora',
    model: 'User',
    populate: {
      path: 'user',
      model: 'Protectora'
    }
  }])
  if (animal) {
    if (request.user !== undefined) {
      const {user} = request.user
      console.log(user._id);
      console.log(animal.protectora._id.toString());
      let canEdit = false
      if (user._id === animal.protectora._id.toString()) {
        canEdit = true
      }
      const solicitado = await Solicitud.find({adoptante: user._id, animal: id})
      return response.render('animales/animal', {animal, solicitado, canEdit})
    }
    return response.render('animales/animal', {animal})
  }
   else{
    response.redirect('/animales')
  }
}

const solicitudAnimal = async (request, response) => {
  const {animal, mensaje} = request.body
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
module.exports = {renderAnimales, solicitudAnimal, renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal}
