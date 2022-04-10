const Adoptante = require('../models/Adoptante')
const validatorAdoptante = require('../utils/service.validations.user')

const renderRegistroAdoptante =  (request, response) => {
  response.redirect('/users/registro')
}

const registroAdoptante = async (request, response) => {
  let errors = [];
  const { email, cif, telefono, descripcion, nombre, password } = request.body;
  const {file} = request
  console.log(file)
  let tipo = 'adoptante'
  // if (!validatorAdoptante.validateNombreAdoptante(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorAdoptante.validateTelefonoAdoptante(telefono)
  // const validation = validatorAdoptante.validateAdoptante(request)
  // if (validation.length !== 0) {
  //   return response.render('users/signup_adoptante', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  // }
  const newAdoptante = new Adoptante({ 
    nombre: nombre, 
    email: email, 
    tipo: tipo, 
    cif: cif, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    password: password,
    image: (file == undefined) ? file : file.filename,
  });
  console.log(newAdoptante)
  newAdoptante.password = await newAdoptante.encryptPassword(password);
  await newAdoptante.save();
  request.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
  response.redirect('/users/login')
}


const renderAdoptantes = async (request, response) => {
  const Adoptantes = await Adoptante.find({}) 
  response.render('users/adoptantes', {Adoptantes})
}

const renderAdoptante = async (request, response) => {
  const { id } = request.params

  Adoptante.findById(id)
    .then(Adoptante => {
      if (Adoptante)
      response.render('users/adoptante', {Adoptante})
    })
    .catch(err => next(err))

}

module.exports = {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante}