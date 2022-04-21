const User = require('../models/User')
const Adoptante = require('../models/Adoptante')
const Solicitud = require('../models/Solicitud')
const Protectora = require('../models/Protectora')
const Animal = require('../models/Animal')
const { validateUser, validateLogin} = require('../utils/service.validations.user')
const jwt = require('jsonwebtoken')

const renderRegistro = (request, response) => {
  response.render('users/signup')
}


const registro = async (request, response) => {
  const { email, password, confirm_password, role } = request.body;
  const validation = validateUser(request)
  if (Object.keys(validation).length !== 0) {
    let checkedA;
    let checkedP;
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

// const login2 = passport.authenticate('local', {
//   successRedirect: "/",
//   failureRedirect: "/users/login",
//   failureFlash: true,
// })

const login = async (request, response) => {
  const {email, password} = request.body;

  const pruebas = await validateLogin(request.body)
  console.log(pruebas);
  // const user = await User.findOne({ email: email })
  // const validationEmail = validateEmailLogin(email, user)
  if (Object.keys(pruebas).length !== 0) {
    return response.render("users/login", {errors: pruebas,email})
  } 
  const user = await User.findOne({ email: email })
  const token = jwt.sign({user}, 'SECRET', {expiresIn: "24h"});
  response.cookie('token', token, {
    httpOnly: true
  });

  return response.redirect('/')  
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

const deleteUser = async (request, response) => {
  const id = request.params.id
  const {user} = request.user; 

  if(user.role === 'Adoptante') {
  const solicitudDeleted = await Solicitud.findOneAndRemove({adoptante: user._id})
  } else {
    const protectora = await Protectora.findById(user.user)
    protectora.animales.forEach(async (animal) => {
      await Animal.findByIdAndDelete(animal)
    });
    const solicitudDeleted = await Solicitud.findOneAndRemove({protectora: user._id})
  }
  const userRoleDeleted = await Adoptante.findByIdAndDelete(user.user)
  const userdeleted = await User.findByIdAndDelete(user._id)
  response.redirect('/users/protectoras')
}


module.exports = {renderRegistro, registro,login,renderLogin, logout, deleteUser}