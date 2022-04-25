const User = require('../models/User')
const {validateUser} = require('../utils/service.validations.user')
const jwt = require('jsonwebtoken')

const renderRegistro = (request, response) => {
  response.render('users/signup')
}

const registro = async (request, response) => {
  const { email, password, confirm_password, role } = request.body;
  let checkedA;
  let checkedP;

  const validation = validateUser(request)
  if (Object.keys(validation).length !== 0) {
    if (role === "Adoptante") {
      checkedA = 'checked'
    } else if (role === "Protectora") {
      checkedP = 'checked'
    }
    return response.render("users/signup", {errors: validation,
      email,
      password,
      confirm_password,
      role,
      checkedA,
      checkedP,
    });
  } 
  else {
    if (role === 'Protectora') {
      response.render("users/signup_protectora", {email, password, role});
    } else {
      response.render("users/signup_adoptante", {email, password, role});
    }
  }
 }

const login = async (request, response) => {
  const {email, password} = request.body;

  const user = await User.findOne({ email: email })
  if (!user) {
      response.send('USuario no encontrado')  
    } else {
    // Match Password's User
    const match = await  user.matchPassword(password);

    if (match) {
      const token = jwt.sign({user}, 'SECRET', {expiresIn: "24h"});

      response.cookie('token', token, {
        httpOnly: true
      });

      return response.redirect('/')  
    } else {
      response.send('contraseña incorrecta')   
    }
  }

}

const renderLogin = (request, response) => {
  response.render('users/login')
}

const logout = (request, response) => {
  try {
    response.clearCookie("token")
    return response.redirect('/')
  } catch (error) {
    response.status(500).send(error)
  }
}


module.exports = {renderRegistro, registro,login,renderLogin,logout}