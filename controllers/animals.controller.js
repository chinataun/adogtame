const Animal = require('../models/Animal')
const {validateNombreAnimal, validateAnimal} = require('../utils/service.validations')

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
  let animales = []
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
  if (validation.length !== 0) {
    return response.render('animales/new-animal', {errors: validation})
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

module.exports = {renderAnimales, renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal}
