/* eslint-disable no-undef */
const router = require('express').Router()
const { default: axios } = require('axios')
// const mongoose = require ('mongoose')

router.get('', async(request, response) => {
	try {
		const datosApi = await axios.get('http://localhost:3000/api/datos')
		response.render('index', {rows : datosApi.data})
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