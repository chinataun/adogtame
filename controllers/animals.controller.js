const Animal = require('../models/Animal')
const {validateAnimal} = require('../utils/service.validations.animales')

const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  response.render('pages/animales', {animales})
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
    response.render('pages/animales', {animales})
  })
  .catch(err => next(err))




}

const addAnimal = async (request, response, error) => {

  const {file, body} = request
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
    console.log((body.edad == '') ? undefined : body.edad)
    console.log(file == undefined)
    const animal = new Animal({
            nombre: body.nombre,
            tipo: body.tipo,
            raza: body.raza,
            edad: (body.edad == '') ? undefined : body.edad,
            genero: body.genero,
            descripcion: (body.descripcion == '') ? undefined : body.descripcion,
            image: (file == undefined) ? file : file.filename,
        })
        const savedUser = await animal.save()
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/add')
  } catch (error) {
    response.render('animales/add')
  }
}
const renderAnimal = async (request, response) => {
  const { id } = request.params

  Animal.findById(id)
    .then(animal => {
      if (animal) 
      response.render('animales/animal', {animal})
    })
    .catch(err => next(err))

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
