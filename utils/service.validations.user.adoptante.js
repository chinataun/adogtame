const {obligatorio, validateNombre, validateImage, validateDescripcion,validateTelefono}  = require('./service.validations')

function validateDni(dni) {
  // var str = cif.replace(/\s/g, '');
  if (obligatorio(dni)) {
    return 'DNI obligatorio'
  } else if (dni.length != 9) {
    return 'El numero de caracteres de un DNI son 9. Ejemplo: 11111111A'
  }else if (!/^(\d{7})([ABCDEFGHJKLMNPQRSUVW])([0-9A-J])$/.test(dni)) {
    return 'Tipo de DNI inválido'
  }
  return '';
}

function validateAdoptante(params) {
  const {file, body} = params
  const errores = [];
  if (validateNombre(body['nombre']) !== '') errores.push(validateNombre(body['nombre']));
  if (validateDni(body['dni']) !== '') errores.push(validateDni(body['dni']));
  if (validateTelefono(body['telefono']) !== '') errores.push(validateTelefono(body['telefono']));
  if (validateImage(file) !== '') errores.push(validateImage(file));
  if (validateDescripcion(body['descripcion']) !== '') errores.push(validateDescripcion(body['descripcion']));

  return errores;

}

module.exports = {validateAdoptante, validateDni}