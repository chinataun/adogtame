const Animal = require('../models/Animal')


const renderAnimales = async (request, response) => {
  const animales = await Animal.find({}) 
  
  response.render('pages/animales', {animales})
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/new-animal', {message: null})
}



module.exports = {renderAnimales, renderAddAnimal}