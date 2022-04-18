const router = require('express').Router()
const {renderRegistro, registro,renderRegistroProtectora, registroProtectora, renderLogin, login} = require('../controllers/users.controller')
const {renderProtectoras, renderProtectora,busquedaProtectoras} = require('../controllers/user.protectora.controller')
router.get("/registro", renderRegistro);
router.post("/registro", registro);

//PROTECTORAS
router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', registroProtectora)
router.get("/protectoras", renderProtectoras);
router.post('/protectoras/buscar', busquedaProtectoras)
router.get('/protectora/:id',renderProtectora)


router.get("/login", renderLogin);
router.post("/login", login);

module.exports =  router;