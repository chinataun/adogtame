const User = require('../models/User')
const Adoptante = require('../models/Adoptante')
const Solicitud = require('../models/Solicitud')
const Protectora = require('../models/Protectora')
const Animal = require('../models/Animal')
const { validateUser } = require('../utils/service.validations.user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

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
    return response.render("users/signup", {
      errors: validation,
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
      response.render("users/signup_protectora", { email, password, role });
    } else {
      response.render("users/signup_adoptante", { email, password, role });
    }
  }
}

const login = async (request, response) => {
  const { email, password } = request.body;
  // const user = await User.findOne({ email: email })
  // const validationEmail = validateEmailLogin(email, user)
  // if (Object.keys(validationEmail).length !== 0) {
  //   return response.render("users/login", { errors: pruebas, email })
  // }
  const user = await User.findOne({ email: email })
  const token = jwt.sign({ user }, 'SECRET', { expiresIn: "24h" });
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
  const user = request.user;
  if (user.role === 'Adoptante') {
        // const solicitud = await Solicitud.findOneAndDelete({ adoptante: user.id })

    const solicitudes = await Solicitud.find({adoptante: user.id}).populate('animal').populate([{
      path: 'adoptante',
      model: 'User',
    }])
    solicitudes.forEach(async (solicitud) => {
      await Solicitud.findByIdAndDelete(solicitud.id)
    });
    const adoptanteDeleted = await Adoptante.findByIdAndDelete(user.user.id)
    try {
      await unlinkAsync("public/uploads/" + adoptanteDeleted.image)
    } catch (err) {
      console.log(err);
    }
  } else {
    const protectora = await User.findById(user.id).populate('user').populate([{
      path: 'user',
      model: 'Protectora',
      populate: {
        path: 'animales',
        model: 'Animal'
      }
    }])
    protectora.user.animales.forEach(async (animal) => {
      await Animal.findByIdAndDelete(animal)
    });

    const solicitudes = await Solicitud.find({protectora: user.id})
    solicitudes.forEach(async (solicitud) => {
      console.log(solicitud);
      await Solicitud.findByIdAndDelete(solicitud.id)
    });
    // const solicitud = await Solicitud.findOneAndDelete({ protectora: user.id })

    const protectoraDeleted = await Protectora.findByIdAndDelete(user.user.id)
    try {
      await unlinkAsync("public/uploads/" + protectoraDeleted.image)
    } catch (err) {
      console.log(err);
    }
  }

  await User.findByIdAndDelete(user.id)
  
  return response.clearCookie("token").redirect('/')
}

module.exports = { renderRegistro, registro, login, renderLogin, logout, deleteUser}