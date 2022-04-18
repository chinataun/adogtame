const router = require('express').Router()
const {renderRegistro, registro,renderRegistroProtectora, registroProtectora, renderLogin, login} = require('../controllers/users.controller')
const {renderProtectoras} = require('../controllers/user.protectora.controller')
router.get("/registro", renderRegistro);
router.post("/registro", registro);

//PROTECTORAS
router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', registroProtectora)
router.get("/protectoras", renderProtectoras);

router.get("/login", renderLogin);
router.post("/login", login);

module.exports =  router;