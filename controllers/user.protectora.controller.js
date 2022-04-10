const Protectora = require('../models/Protectora')
const validatorProtectora = require('../utils/service.validations.user')


const renderRegistroProtectora =  (request, response) => {

  response.redirect('/users/registro')
}

const registroProtectora = async (request, response) => {
  let errors = [];
  const { email, cif, telefono, descripcion, nombre, password } = request.body;
  const {file} = request
  console.log(file)
  let tipo = 'protectora'
  // if (!validatorProtectora.validateNombreProtectora(nombre)) errors.push('El nombre debe ser superior a 4 caracteres'); 
  // validatorProtectora.validateTelefonoProtectora(telefono)
  const validation = validatorProtectora.validateProtectora(request)
  if (validation.length !== 0) {
    return response.render('users/signup_protectora', {errors: validation, email, cif, telefono, descripcion, nombre, password})
  }
  const newProtectora = new Protectora({ 
    nombre: nombre, 
    email: email, 
    tipo: tipo, 
    cif: cif, 
    telefono: telefono, 
    descripcion: (descripcion == '') ? undefined : descripcion,
    password: password,
    image: (file == undefined) ? file : file.filename,
  });
  console.log(newProtectora)
  newProtectora.password = await newProtectora.encryptPassword(password);
  await newProtectora.save();
  request.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
  response.redirect('/users/login')
}


const renderProtectoras = async (request, response) => {
  const protectoras = await Protectora.find({}) 
  response.render('users/protectoras', {protectoras})
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

const renderProtectora = async (request, response) => {
  const { id } = request.params

  Protectora.findById(id)
    .then(protectora => {
      if (protectora)
      response.render('users/protectora', {protectora})
    })
    .catch(err => next(err))

}

module.exports = {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora}