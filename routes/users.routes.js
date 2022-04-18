const router = require('express').Router()
const {renderRegistro, registro, renderLogin, login} = require('../controllers/users.controller')
const {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora} = require('../controllers/user.protectora.controller')
const {renderRegistroAdoptante, registroAdoptante} = require('../controllers/user.adoptante.controller')

//USERS
router.get("/registro", renderRegistro);
router.post("/registro", registro);

//PROTECTORAS
router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', registroProtectora)
router.get("/protectoras", renderProtectoras);
router.post('/protectoras/buscar', busquedaProtectoras)
router.get('/protectora/:id',renderProtectora)

//ADOPTANTES
router.get('/registro/adoptante', renderRegistroAdoptante)
router.post('/registro/adoptante', registroAdoptante)

router.get("/login", renderLogin);
router.post("/login", login);

module.exports =  router;