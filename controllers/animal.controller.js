const Animal = require('../models/Animal')


const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  
  response.render('pages/animales', {animales})
}

const renderAddAnimal = async (request, response) => {
  const message = request.flash('success_msg')
  const errors_msg = request.flash('errors_msg')
  const body = request.flash('body')
  console.log(errors_msg);
  console.log(body)
  console.log(message)
  console.log(request.body)
  // console.log(errors_msg);
  response.render('animales/new-animal', {message: message, errors_msg: errors_msg, valores: body})
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
    // response.send({data: savedUser})
    request.flash('success_msg', 'Añadido con éxito')
    response.redirect('/animales/add')
  } catch (error) {
    console.log(error)
  }
	// // const datos = request.body
	// const errors = validationResult(request)

	// if (!errors.isEmpty()) {
	// 	// request.flash('errors_msg', errors.array())
	// 	request.flash('errors_msg', errors.array())
	// 	request.flash('body', request.body)

	// 	// response.status(400).render('/animales/add')
	// 	// response.status(400).render('animales/new-animal', {errors_msg: errors_msg,valores: valores})
	// 	// return response.status(400).json({error: errors.array()})
	// 	response.redirect('/animales/add')
	// } else {
	// 	const animal = new Animal({
	// 		nombre: datos.nombre,
	// 		tipo: datos.tipo,
	// 		raza: datos.raza,
	// 		edad: datos.edad,
	// 		genero: datos.genero,
	// 		descripcion: datos.descripcion
	// 	})
		
	// 	const savedUser = await animal.save()
		
	// 	request.flash('success_msg', 'Añadido con éxito')
	// 	// response.render('animales/new-animal',{animal: savedUser, success})
	// 	response.redirect('/animales/add')
	// }

	// if (!datos) {
	// 	return response.status(400).json({
	// 		error: 'required content field missing'
	// 	})
	// }
}

module.exports = {renderAnimales, renderAddAnimal, addAnimal}