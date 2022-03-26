const { check, body, validationResult } = require('express-validator')
const Animal = require('../models/Animal')
const validateAddAnimal = [
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
  (request, response)=> {
    // validateResult(request, response, next)

    try {
      // const pedo = validationResult(request).throw()
      // response.status(200).statusMessage('ADELANTE!!!').send(pedo)
       validationResult(request).throw()
      // next()
      //try {
        const datos = request.body
        const animal = new Animal({
          nombre: datos.nombre,
          tipo: datos.tipo,
          raza: datos.raza,
          edad: datos.edad,
          genero: datos.genero,
          descripcion: datos.descripcion
        })
        
        const savedUser = animal.save()
        // response.send({data: savedUser})
        request.flash('success_msg', 'Añadido con éxito')
        response.render('animales/add', {success_msg: request.flash('success_msg')})

        // response.redirect('/animales/add')

    } catch (errors) {
      console.log('pedo');
      console.log(errors.array());
      request.flash('errores', errors.array())
      //console.log(request.flash('error_msg'))
      response.render('animales/add')

      //response.redirect('/animales/add')
      // req.session.errors = error.array();
      //       req.session.success = false;
      // response.send(error.array())
    //  next()
      // response.status(403).send({error: errors.array()})
    }
    
  }
]

module.exports = {validateAddAnimal}