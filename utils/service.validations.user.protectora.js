const {obligatorio, validLength, validateNombre, validateImage, validateDescripcion,validateTelefono}  = require('./service.validations')


function validateCifProtectora(cif) {
  // var str = cif.replace(/\s/g, '');
  if (obligatorio(cif)) {
    return 'CIF obligatorio'
  } else if (cif.length != 9) {
    return 'Escribe un cif con 9 caracteres'
  }else if (!/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(cif)) {
    return 'Tipo de CIF invalido'
  }
  return '';
}

function validateCiudadProtectora(ciudad) {
  if (obligatorio(ciudad)) {
    return 'Ciudad obligatorio'
  } else if (validLength(ciudad, 50)) {
    return 'La ciudad no puede tener mas de 50 caracteres'
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
  if (validateImage(file) !== '') errores.file = (validateImage(file));
  if (validateDescripcion(body['descripcion']) !== '') errores.descripcion = (validateDescripcion(body['descripcion']));

  return errores;

}

module.exports = {validateProtectora, validateCiudadProtectora, validateCifProtectora}