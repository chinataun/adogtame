const Protectora = require('../models/Protectora')

const renderProtectoras = async (request, response) => {
  const protectoras = await Protectora.find({})
  response.render('users/protectoras', {protectoras})
}
module.exports = {renderProtectoras}
