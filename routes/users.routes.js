const router = require('express').Router()

const {renderRegistro, registro,renderRegistroProtectora, registroProtectora, renderLogin, login} = require('../controllers/users.controller')

// Routes
router.get("/registro", renderRegistro);
router.post("/registro", registro);

router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', registroProtectora)

router.get("/login", renderLogin);
router.post("/login", login);

module.exports =  router;