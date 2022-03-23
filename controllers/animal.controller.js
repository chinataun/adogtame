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

const addAnimal = async (request, response) => {
  try {
    const datos = request.body
    const animal = new Animal({
			nombre: datos.nombre,
			tipo: datos.tipo,
			raza: datos.raza,
			edad: datos.edad,
			genero: datos.genero,
			descripcion: datos.descripcion
		})
		
		const savedUser = await animal.save()
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/add')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {renderAnimales, renderAddAnimal, addAnimal}