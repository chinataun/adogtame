const Animal = require('../models/Animal')

const renderAnimals = async (request, response) => {
  const animales = await Animal.find({}) 
  response.render('pages/animales', {animales})
}

const renderAddAnimal = async (request, response) => {
  response.render('animales/add')
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

module.exports = {renderAnimals, renderAddAnimal, addAnimal}
