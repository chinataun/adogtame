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

module.exports = {renderProtectoras, renderProtectora}
