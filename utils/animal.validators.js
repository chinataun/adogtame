const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateAddAnimal = [
  check('nombre', 'El nombre debe tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({max: 20}),
  check('tipo', 'El tipo debe tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({max: 20}),
  check('raza', 'La raza tener 20 caracteres o menos' )
    .exists()
    .notEmpty()
    .isLength({ max: 20}),
  check('edad', 'Numero mayor que 0')
    .isNumeric({min: 0}),
  check('genero', 'El genero debe estar seleccionado')
    .notEmpty(),
  check('descripcion', 'La descripción debe tener una longitud inferor a 100' )
    .exists()  
    .isLength({max: 100}),
  (request, response, next) => {
    validateResult(request, response, next)
  }
]

module.exports = {validateAddAnimal}