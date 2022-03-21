const express = require('express')
const router = express.Router()
const {renderSignUpForm, singup} = require('../controllers/users.controller')

// import {
//   renderSignUpForm,
//   singup,
// } from "../controllers/users.controller";

// Routes
router.get("/signup", renderSignUpForm);

router.post("/signup", singup);

module.exports =  router;
