const { body } = require('express-validator')

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
    .isLength({max: 100}),
    function(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.mapped()});
      }
      next();
    },
]

module.exports = {animalValidate}