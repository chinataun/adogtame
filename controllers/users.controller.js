const User = require('../models/User')
const validator = require('../utils/service.validations')
const  passport = require('passport')

const renderRegistro = (request, response) => {
  response.render('users/signup')
}


const registro = async (request, response) => {
  let errors = [];
  const { email, password, confirm_password, role } = request.body;
  // if (email.length <= 0 ) {
  //   errors.email = ('Inserta email')
  // }
  // if (password != confirm_password) {
  //   errors.push("Las contraseñas no coinciden");
  // }
  // if (password.length < 8 || password.length > 20) {
  //   errors.push("La contraseña debe contener entre 8 y 20 caracteres");
  // }
  // const emailUser = await User.findOne({ email: email });
  // if (emailUser) {
  //   errors.push("Ya existe un usuario con ese email");
  // }
  // if (role == undefined) {
  //   errors.push("Debe serleccionar un tipo de registro");
  // }
  let checkedA;
  let checkedP;

  /*const validation = validateUser(request)
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
  else {*/
    if (role === 'Protectora') {
      response.render("users/signup_protectora", {email, password, role});
      // res.redirect('registro/protectora')
    } else {
      response.render("users/signup_adoptante", {email, password, role});
      // res.redirect('registro/protectora')
    }
  }
// }

 const login = passport.authenticate('local', {
   successRedirect: "/",
   failureRedirect: "/users/login",
   failureFlash: true,
 })

/*const login = async (request, response) => {
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

}*/

const renderLogin = (request, response) => {
  response.render('users/login')
}

/*const logout = (request, response) => {
  try {
    response.clearCookie("token")
    return response.redirect('/')
  } catch (error) {
    response.status(500).send(error)
  }
}*/


module.exports = {renderRegistro, registro,login,renderLogin}