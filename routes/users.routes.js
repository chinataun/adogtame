const router = require('express').Router()

const {renderRegistro, registro} = - require('../controllers/users.controller')

// Routes
router.get("/registro", renderRegistro);
router.post("/registro", registro);

module.exports =  router;