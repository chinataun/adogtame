const router = require('express').Router()
const {renderRegistro, registro, renderLogin, login} = require('../controllers/users.controller')
const {renderRegistroProtectora, registroProtectora, renderProtectoras, busquedaProtectoras, renderProtectora} = require('../controllers/user.protectora.controller')
const {renderRegistroAdoptante, registroAdoptante, renderAdoptantes, renderAdoptante} = require('../controllers/user.adoptante.controller')
const upload = require('../utils/handleUpload')

//USERS
router.get("/login", renderLogin);
router.post("/login", login);
router.get("/registro", renderRegistro);
router.post("/registro", registro);

//PROTECTORAS
router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', upload.single('image'), registroProtectora)
router.get("/protectoras", renderProtectoras);
router.post('/protectoras/buscar', busquedaProtectoras)
router.get('/protectora/:id',renderProtectora)

//ADOPTANTES
router.get('/registro/adoptante', renderRegistroAdoptante)
router.post('/registro/adoptante', upload.single('image'), registroAdoptante)
router.get("/adoptantes", renderAdoptantes)
router.get('/adoptante/:id',renderAdoptante)

module.exports =  router;