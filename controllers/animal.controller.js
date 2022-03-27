const Animal = require('../models/Animal')
const { check, body, validationResult } = require('express-validator')

const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  
  response.render('pages/animales', {animales})
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

const addAnimal = async (request, response, error) => {

  const {file, body} = request

  try {
    const datos = body
    const animal = new Animal({
			nombre: body.nombre,
			tipo: body.tipo,
			raza: body.raza,
			edad: body.edad,
			genero: body.genero,
			descripcion: body.descripcion,
      image: file.filename,
		})
		
    console.log(animal);
		const savedUser = await animal.save()
    console.log(savedUser);
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/add')
  } catch (error) {
    console.log('pedo')
    response.render('animales/new-animal')
  }
}

module.exports = {renderAnimales, renderAddAnimal, addAnimal}