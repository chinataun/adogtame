const router = require('express').Router()
const {renderRegistro, registro, renderLogin, login,logout} = require('../controllers/users.controller')
const {renderRegistroProtectora, registroProtectora, renderProtectoras,renderSolicitudesProtectora, busquedaProtectoras, renderProtectora,procesarSolicitudAdopcion,renderEditProtectora,editProtectora} = require('../controllers/user.protectora.controller')
const {renderRegistroAdoptante, registroAdoptante,renderAdoptante,renderSolicitudesAdoptante, renderEditAdoptante, editAdoptante} = require('../controllers/user.adoptante.controller')
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
router.get('/edit-protectora',renderEditProtectora)
router.post('/edit-protectora',upload.single('image'), editProtectora)

//ADOPTANTES
router.get('/registro/adoptante', renderRegistroAdoptante)
router.post('/registro/adoptante', upload.single('image'), registroAdoptante)
router.get('/adoptante/:id',renderAdoptante)
router.get('/solicitudesAdoptante/',renderSolicitudesAdoptante)
router.get('/edit-adoptante',renderEditAdoptante)
router.post('/edit-adoptante',upload.single('image'), editAdoptante)

module.exports =  router;