const {obligatorio, validLength}  = require('./service.validations')
const User = require('../models/User')

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
    return 'La contraseña debe tener un número'
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

function validateImageUser(file) {
  const mimetypes = /image\/png|image\/jpeg|image\/gif/;
  if (file !== undefined) {
    if(!mimetypes.test(file['mimetype'])) {
      return ('Tipo de archivo no soportado. Tipos válidos: jpg, png o gif')
    } else if (file.size > 2097153) {
      return "Tamaño de archivo excedido. Max: 2MB"
    }    
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

const validateEmailLogin = (email, user) => {
  const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
  const errores = {};
  if (obligatorio(email)) {
    return 'Introduce un email de usuario'
  } else if (!emailRegexp.test(email)) {
    return 'Formato de email invalido. Ej: aaa@aaa.com'
  } else if (!user) {
    return 'Usuario no encontrado'
  }
  return '';
}

const validatePasswordLogin = (match) => {
  const errores = {};
  if (!match) {
    return 'Contraseña incorrecta'
  } 
  return '';
}

  const validateLogin = async (params) => {
  const {email, password} = params
  const errores = {};
  const user = await User.findOne({ email: email })
  if (validateEmailLogin(email, user) !== '') return {email : (validateEmailLogin(email, user))};
  const match = await  user.matchPassword(password);
  if (validatePasswordLogin(match) !== '') return {password : (validatePasswordLogin(match))};

  return errores;

}


module.exports = { validateUser, validatePassword,validateEmail,validateEmailLogin,validatePasswordLogin, validateLogin,validateImageUser}