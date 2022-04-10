const router = require('express').Router()
const {renderRegistro, registro,renderRegistroProtectora, registroProtectora, renderLogin, login, renderProtectoras, busquedaProtectoras, renderProtectora} = require('../controllers/users.controller')
const upload = require('../utils/handleUpload')

router.get("/registro", renderRegistro);
router.post("/registro", registro);

router.get('/registro/protectora', renderRegistroProtectora)
router.post('/registro/protectora', upload.single('image'), registroProtectora)

router.get("/login", renderLogin);
router.post("/login", login);

router.get("/protectoras", renderProtectoras);
router.post('/protectoras/buscar', busquedaProtectoras)
router.get('/protectora/:id',renderProtectora)

module.exports =  router;