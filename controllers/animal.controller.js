const Animal = require('../models/Animal')
const { check, body, validationResult } = require('express-validator')
const {validateNombreAnimal, validateAnimal} = require('../utils/service.validations')

const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  console.log(animales);
  
  response.render('pages/animales', {animales})
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

const renderAddAnimal = async (request, response,error) => {
  // console.log(validationResult(request));
  // console.log(body)
  // console.log(message)
  // console.log(request.body)
  // console.log(errors_msg);
	// if (errors_msg.length > 0) {
		response.render('animales/new-animal')

	// } else {
	// 	response.status(203).render('animales/new-animal', {message: message})

	// }
  
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
    // const datos = body
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
    console.log(savedUser);
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/add')
  } catch (error) {
    console.log('pedo');
    response.render('animales/new-animal')
  }
}

module.exports = {renderAnimales, renderAddAnimal, addAnimal, renderAnimal, busquedaAnimal}