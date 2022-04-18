const router = require('express').Router()
const {renderRegistro, registro, renderLogin, login,logout} = require('../controllers/users.controller')
const {renderRegistroProtectora, registroProtectora, renderProtectoras,renderSolicitudesProtectora, busquedaProtectoras, renderProtectora,procesarSolicitudAdopcion} = require('../controllers/user.protectora.controller')
const {renderRegistroAdoptante, registroAdoptante,renderAdoptante,renderSolicitudesAdoptante} = require('../controllers/user.adoptante.controller')
const upload = require('../utils/handleUpload')

//USERS
router.get("/registro", renderRegistro);
router.post("/registro", registro);
router.get("/login", renderLogin);
router.post("/login", login);
router.get("/logout", logout);

//PROTECTORAS
router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', upload.single('image'),registroProtectora)
router.get("/protectoras", renderProtectoras);
router.post('/protectoras/buscar', busquedaProtectoras)
router.get('/protectora/:id',renderProtectora)
router.get('/solicitudesProtectora/',renderSolicitudesProtectora)
router.post('/protectora/procesarSolicitud/',procesarSolicitudAdopcion)

//ADOPTANTES
router.get('/registro/adoptante', renderRegistroAdoptante)
router.post('/registro/adoptante', upload.single('image'), registroAdoptante)
router.get('/adoptante/:id',renderAdoptante)
router.get('/solicitudesAdoptante/',renderSolicitudesAdoptante)

module.exports =  router;