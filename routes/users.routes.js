const router = require('express').Router()

const {renderRegistro, registro,renderRegistroProtectora, registroProtectora} = require('../controllers/users.controller')

router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', registroProtectora)
// Routes
router.get("/registro", renderRegistro);
router.post("/registro", registro);

module.exports =  router;