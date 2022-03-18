/* eslint-disable no-undef */
const router = require('express').Router()
const { default: axios } = require('axios')
const Animal = require('../../models/Animal')
const {getAnimals} = require('../../controllers/animal.controller')
router.get('', async (request, response) => {
	
	const animales = await Animal.find({}) 
	// console.log(animales)	
	try {
			// const datosApi = await axios.get('/api/datos')
		
			response.render('index', {rows : animales})
		}
		catch (err) {
			if (err.response) {
				console.error(err.response.data)
				console.error(err.response.status)
				console.error(err.response.headers)
			} else if(err.request) {
				console.error(err.request)
							
			}else{
				console.error('error', err.message)
			}
		}
	})



module.exports = router