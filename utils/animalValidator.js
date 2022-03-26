const { body, validationResult } = require('express-validator')

const animalValidate = [
  body('nombre', 'El nombre debe tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({max: 20}),
    body('tipo', 'El tipo debe tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({max: 20}),
    body('raza', 'La raza tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({ max: 20}),
    body('edad', 'Numero mayor que 0')
    .isNumeric({min: 0}),
    body('genero', 'El genero debe estar seleccionado')
    .notEmpty(),
    body('descripcion', 'La descripción debe tener una longitud inferor a 100' )
    .exists()  
    .isLength({max: 100})
]

const checkRules = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    request.flash('error_msg', errors.array())
   return response.redirect('/animales/add')
  }
  // next();
  // response.redirect('/animales/add')
  return response.status(201).json()
}

module.exports = {animalValidate, checkRules}