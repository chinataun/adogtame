const {obligatorio, validateNombre, validateDescripcion,validateTelefono}  = require('./service.validations')
const {validateImageUser}  = require('./service.validations.user')

function validateDni(dni) {
  if (obligatorio(dni)) {
    return 'DNI obligatorio'
  } else if (dni.length != 9) {
    return 'El número de caracteres de un DNI son 9. Ej: 12345678K'
  }else if (!/^\d{8}[a-zA-Z]$/.test(dni)) {
    return 'Tipo de DNI inválido. Ej: 12345678K'
  }
  return '';
}

function validateAdoptante(params) {
  const {file, body} = params
  const errores = {};
  if (validateNombre(body['nombre']) !== '') errores.nombre = (validateNombre(body['nombre']));
  if (validateDni(body['dni']) !== '') errores.dni = (validateDni(body['dni']));
  if (validateTelefono(body['telefono']) !== '') errores.telefono = (validateTelefono(body['telefono']));
  if (validateImageUser(file) !== '') errores.image = (validateImageUser(file));
  if (validateDescripcion(body['descripcion']) !== '') errores.descripcion = validateDescripcion(body['descripcion']);

  return errores;

}

module.exports = {validateAdoptante, validateDni}