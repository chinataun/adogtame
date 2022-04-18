const Protectora = require('../models/Protectora')

const renderProtectoras = async (request, response) => {
  const protectoras = await Protectora.find({})
  response.render('users/protectoras', {protectoras})
}

const renderProtectora = async (request, response) => {
  const { id } = request.params
  const userProtectora = await Protectora.findById(id)
const animales = {}
  response.render('users/protectora', {protectora: userProtectora, animales})

}
const busquedaProtectoras = async (request, response) => {

  const {busqueda} = request.body
  console.log(busqueda);
  Protectora.find({
    'descripcion' : {$regex : busqueda}
  })
  .then(protectoras => {

    if (protectoras)
    response.render('users/protectoras', {protectoras})
  })
  .catch(err => next(err))




}
module.exports = {renderProtectoras, renderProtectora,busquedaProtectoras}
