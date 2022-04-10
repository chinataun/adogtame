function validatePassword(password) {
  const validLength = password.length >= 8
  let hasLetter = /[a-zA-Z]/g.test(password)
  let hasNumber = /[0-9]/g.test(password)
  return hasNumber && hasLetter && validLength
}

function obligatorio(param) {
  var knownStringVar = "" +  param;
  return knownStringVar.length == 0
}

function validLength(param, num) {
  var knownStringVar = "" +  param;
  return knownStringVar.length > num
}

function validateNombreProtectora(nombre) {
  if (obligatorio(nombre)) {
    return 'Nombre obligatorio'
  } else if (validLength(nombre, 20)) {
    return 'El nombre no puede tener mas de 20 caracteres'
  }
  return '';
}

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
function validateTelefonoProtectora(telefono) {
  // var str = telefono.toString().replace(/\s/g, '');
  // console.log(str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str));
  // return str.length === 9 && /^[679]{1}[0-9]{8}$/.test(str);
  if (obligatorio(telefono)) {
    return 'Telefono obligatorio'
  } else if (telefono.length != 9) {
    return 'Escribe un telefono con 9 caracteres'
  }else if (!/^[679]{1}[0-9]{8}$/.test(telefono)) {
    return 'Tipo de telefono invalido'
  }
  return '';
}

function validateImageProtectora(file) {
  const mimetypes = /image\/png|image\/jpeg|image\/gif/;
  if (file !== undefined) {
    if(!mimetypes.test(file['mimetype'])) {
      return ('Tipo de archivo no soportado. Tipos validos: jpg, png o gif')
    } else if (file.size > 2097153) {
      return "Tamaño de archivo excedido. Max: 2MB"
    }    
  }
  return '';
}

function validateDescripciónProtectora(descripcion) {
  if (validLength(descripcion, 500)) {
    return 'La descripción no puede tener mas de 500 caracteres'
  }
  return '';
}

function validateProtectora(params) {
  const {file, body} = params
  const errores = [];
  if (validateNombreProtectora(body['nombre']) !== '') errores.push(validateNombreProtectora(body['nombre']));
  if (validateTelefonoProtectora(body['telefono']) !== '') errores.push(validateTelefonoProtectora(body['telefono']));
  if (validateCifProtectora(body['cif']) !== '') errores.push(validateCifProtectora(body['cif']));
  // if (validateEdadAnimal(body['edad']) !== '') errores.push(validateEdadAnimal(body['edad']));
  // if (validateGeneroAnimal(body['genero']) !== '') errores.push(validateGeneroAnimal(body['genero']));
  if (validateDescripciónProtectora(body['descripcion']) !== '') errores.push(validateDescripciónProtectora(body['descripcion']));
  // // if (validateImageAnimal(file) !== '') errores.push(validateImageAnimal(file));

  return errores;

}

module.exports = {validateProtectora, obligatorio, validLength,validatePassword, validateTelefonoProtectora,validateNombreProtectora, validateDescripciónProtectora, validateImageProtectora, validateCifProtectora}