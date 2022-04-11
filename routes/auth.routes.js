const router = require('express').Router()
const {renderRegistro, registro, renderLogin, login} = require('../controllers/users.controller')

//USERS
router.get("/login", renderLogin);
router.post("/login", login);

router.get("/registro", renderRegistro);
router.post("/registro", registro);

module.exports =  router;