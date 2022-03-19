const {validationResult} = require('express-validator')

const validateResult = (request, response, next) => {
  try {
    validationResult(request).throw()
    next()
  } catch (error) {
    response.status(403)
    request.flash('errors_msg', error.array())
    response.redirect('/animales/add')
  }
}

module.exports = {validateResult}