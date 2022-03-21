const User = require('../models/User')
const { check, body, validationResult } = require('express-validator')

const renderSignUpForm = (request, response) => {
  response.render('users/signup')
}

const singup = async (req, res) => {
  let errors = [];
  const { email, password, confirm_password, tipo } = req.body;
  if (email.length <= 0 ) {
    errors.push({msg: 'Inserta email'})
  }
  if (password != confirm_password) {
    errors.push({ msg: "Las contraseñas no coinciden" });
  }
  if (password.length < 8 && password.length > 20) {
    errors.push({ msg: "La contraseña debe contener entre 8 y 20 caracteres" });
  }
  if (errors.length > 0) {
    req.flash("error_msg", errors);

    res.render("users/signup", {
      errors_msg : req.flash("error_msg"),
      email,
      password,
      confirm_password,
      tipo
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error', "The Email is already in use.");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ email, password, tipo });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", `Usuario ${tipo} con email: ${email} registrado`);
      res.redirect("/");
    }
  }
};

module.exports = {renderSignUpForm, singup}