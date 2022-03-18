const express = require('express')
const router = express.Router()
const Animal = require('../models/Animal')

const {renderNotes} = require('../controllers/animal.controller')

router.get('/add',  (request, response) => {
  response.render('animales/new-animal')
})


router.post('/add', async (request, response) => {
	const datos = request.body
	if (!datos) {
		return response.status(400).json({
			error: 'required content field missing'
		})
	}

  const animal = new Animal({
		nombre: datos.nombre,
		tipo: datos.tipo,
		raza: datos.raza,
		edad: datos.edad,
		genero: datos.genero,
		descripcion: datos.descripcion
	})
	
  const savedUser = await animal.save()

  // response.json(savedUser)
  response.redirect('/animales')
})

router.get('/', renderNotes)

module.exports = router