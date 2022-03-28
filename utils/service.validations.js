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


function validateNombreAnimal(nombre) {
  if (obligatorio(nombre)) {
    return 'Nombre obligatorio'
  } else if (validLength(nombre, 20)) {
    return 'El nombre no puede tener mas de 20 caracteres'
  }
  return '';
}

function validateTipoAnimal(tipo) {
  if (obligatorio(tipo)) {
    return 'Tipo obligatorio'
  } else if (validLength(tipo, 20)) {
    return 'El tipo no puede tener mas de 20 caracteres'
  }
  return '';
}

function validateRazaAnimal(raza) {
  if (obligatorio(raza)) {
    return 'Raza obligatoria'
  } else if (validLength(raza, 20)) {
    return 'La raza no puede tener mas de 20 caracteres'
  }
  return '';
}

function validateEdadAnimal(edad) {
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

function validateImageAnimal(file) {
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

function validateDescripciónAnimal(descripcion) {
  if (validLength(descripcion, 500)) {
    return 'La descripción no puede tener mas de 500 caracteres'
  }
  return '';
}

function validateAnimal(params) {
  const {file, body} = params
  const errores = [];
  if (validateNombreAnimal(body['nombre']) !== '') errores.push(validateNombreAnimal(body['nombre']));
  if (validateTipoAnimal(body['tipo']) !== '') errores.push(validateTipoAnimal(body['tipo']));
  if (validateRazaAnimal(body['raza']) !== '') errores.push(validateRazaAnimal(body['raza']));
  if (validateEdadAnimal(body['edad']) !== '') errores.push(validateEdadAnimal(body['edad']));
  if (validateGeneroAnimal(body['genero']) !== '') errores.push(validateGeneroAnimal(body['genero']));
  if (validateDescripciónAnimal(body['descripcion']) !== '') errores.push(validateDescripciónAnimal(body['descripcion']));
  if (validateImageAnimal(file) !== '') errores.push(validateImageAnimal(file));

  return errores;

}

module.exports = {obligatorio, validLength, validatePassword, validateNombreAnimal, validateRazaAnimal,validateTipoAnimal,validateEdadAnimal, validateGeneroAnimal,validateImageAnimal, validateDescripciónAnimal,validateAnimal}