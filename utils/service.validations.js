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
  return param.length > num
}


function validateNombre(nombre) {
  if (obligatorio(nombre)) {
    return 'Nombre obligatorio'
  } else if (validLength(nombre, 20)) {
    return 'El nombre debe ser mayor de 3 caracteres y menor de 20'
  }
  return '';
}

function validateTelefono(telefono) {
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

function validateImage(file) {
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

function validateDescripcion(descripcion) {
  if (validLength(descripcion, 500)) {
    return 'La descripción no puede tener mas de 500 caracteres'
  }
  return '';
}

module.exports = { obligatorio, validLength, validatePassword, validateNombre,validateTelefono, validateImage, validateDescripcion}