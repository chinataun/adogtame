const {obligatorio,validLength, validateNombre, validateImage, validateDescripcion, validateFile}  = require('./service.validations')

function validateTipoAnimal(tipo) {
  if (obligatorio(tipo)) {
    return 'Tipo obligatorio'
  } else if (validLength(tipo, 20)) {
    return 'El tipo no puede tener más de 20 caracteres'
  }
  return '';
}

function validateRazaAnimal(raza) {
  if (obligatorio(raza)) {
    return 'Raza obligatoria'
  } else if (validLength(raza, 20)) {
    return 'La raza no puede tener más de 20 caracteres'
  }
  return '';
}

function validateEdadAnimal(edad) {
  console.log(edad)
  if (edad !== '' && edad == 0 ) {
    return 'La edad tiene que ser mayor que 0'
  }
  return ''; 
}

function validateGeneroAnimal(genero) {
  if (genero === undefined ) {
    return 'Género obligatorio'
  }
  return '';
}

function validateAnimal(params) {
  const {files, body} = params
  const errores = {};
  if (validateNombre(body['nombre']) !== '') errores.nombre = validateNombre(body['nombre']);
  if (validateTipoAnimal(body['tipo']) !== '') errores.tipo = (validateTipoAnimal(body['tipo']));
  if (validateRazaAnimal(body['raza']) !== '') errores.raza = (validateRazaAnimal(body['raza']));
  if (validateEdadAnimal(body['edad']) !== '') errores.edad = (validateEdadAnimal(body['edad']));
  if (validateGeneroAnimal(body['genero']) !== '') errores.genero = (validateGeneroAnimal(body['genero']));
  if (files.image) {
    if (validateImage(files.image) !== '') errores.image = (validateImage(files.image));
  }
  if (files.historial) {
    if (validateFile(files.historial) !== '') errores.file = (validateFile(files.historial));
  }
  if (validateDescripcion(body['descripcion']) !== '') errores.descripcion = (validateDescripcion(body['descripcion']));

  return errores;

}

module.exports = {validateAnimal, validateTipoAnimal, validateRazaAnimal, validateEdadAnimal, validateGeneroAnimal, validateDescripcion}
