const {obligatorio, validLength, validateNombre,  validateDescripcion,validateTelefono}  = require('./service.validations')
const {validateImageUser}  = require('./service.validations.user')


function validateCifProtectora(cif) {
  // var str = cif.replace(/\s/g, '');
  if (obligatorio(cif)) {
    return 'CIF obligatorio'
  } else if (cif.length != 9) {
    return 'Escribe un CIF con 9 caracteres. Ej: A12345678'
  }else if (!/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(cif)) {
    return 'Tipo de CIF inválido. Ej: A12345678'
  }
  return '';
}

function validateCiudadProtectora(ciudad) {
  if (obligatorio(ciudad)) {
    return 'Ciudad obligatoria'
  } else if (validLength(ciudad, 50)) {
    return 'La ciudad no puede tener más de 50 caracteres'
  }
  return '';
}

function validateProtectora(params) {
  const {file, body} = params
  const errores = {};
  if (validateNombre(body['nombre']) !== '') errores.nombre = (validateNombre(body['nombre']));
  if (validateCifProtectora(body['cif']) !== '') errores.cif = (validateCifProtectora(body['cif']));
  if (validateTelefono(body['telefono']) !== '') errores.telefono = (validateTelefono(body['telefono']));
  if (validateCiudadProtectora(body['ciudad']) !== '') errores.ciudad = (validateCiudadProtectora(body['ciudad']));
  if (validateImageUser(file) !== '') errores.image = (validateImageUser(file));
  if (validateDescripcion(body['descripcion']) !== '') errores.descripcion = (validateDescripcion(body['descripcion']));

  return errores;

}

module.exports = {validateProtectora, validateCiudadProtectora, validateCifProtectora}