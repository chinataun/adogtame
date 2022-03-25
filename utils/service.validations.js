


function validatePassword(password) {
  const validLength = password.length >= 8
  let hasLetter = /[a-zA-Z]/g.test(password)
  let hasNumber = /[0-9]/g.test(password)
  return hasNumber && hasLetter && validLength
}
function validateNombre(nombre) {
  return nombre.length > 3
}


module.exports = {validatePassword, validateNombre}