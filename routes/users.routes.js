const express = require('express')
const router = express.Router()
const {renderSignUpForm, singup, singupProtectora} = require('../controllers/users.controller')

// import {
//   renderSignUpForm,
//   singup,
// } from "../controllers/users.controller";

// Routes
router.get("/signup", renderSignUpForm);

router.post("/signup", singup);
router.get('/signup/protectora', singupProtectora)

module.exports =  router;
