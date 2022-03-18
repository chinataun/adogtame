const Animal = require('../models/Animal')


const renderNotes = async (request, response) => {
  const animales = await Animal.find({}) 
  response.render('pages/animales', {animales})
}



module.exports = {renderNotes}