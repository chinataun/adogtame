const {obligatorio, validLength}  = require('./service.validations')


function validatePassword(password, confirm_password) {
  const validLength = password.length >= 8
  let hasLetter = /[a-zA-Z]/g.test(password)
  let hasNumber = /[0-9]/g.test(password)
  if (obligatorio(password) && obligatorio(confirm_password)) {
    return 'La constraseñas son obligatorias'
  } else if (password != confirm_password) {
    return 'Las contraseñas no coinciden'
  } else if (!hasLetter) {
    return 'La contraseña debe tener una letra'
  } else if (!hasNumber) {
    return 'La contraseña debe tener un numero'
  } else if (!validLength) {
    return 'La contraseña debe tener mas de 8 caracteres'
  }
  return '';
}

function validateRoleUser(role) {
  if (role === undefined ) {
    return 'Rol obligatorio'
  }
  return '';
}

function validateEmail(email) {
  const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  if (obligatorio(email)) {
    return 'Email obligatorio'
  } else if (!emailRegexp.test(email)) {
    return 'Formato de email invalido. Ej: aaa@aaa.com'
  }
  return '';
}

function validateUser(params) {
  const {file, body} = params
  const errores = {};
  if (validateEmail(body['email']) !== '') errores.email = (validateEmail(body['email']));
  if (validateRoleUser(body['role']) !== '') errores.role = (validateRoleUser(body['role']));
  if (validatePassword(body['password'], body['confirm_password']) !== '') errores.password = (validatePassword(body['password'], body['confirm_password']));

  return errores;

}


module.exports = { validateUser, validatePassword,validateEmail}