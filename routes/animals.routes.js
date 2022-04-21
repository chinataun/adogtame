const router = require('express').Router()
const {renderAnimales,  renderAddAnimal, addAnimal,deleteAnimal, busquedaAnimal, renderAnimal, solicitudAnimal,editAnimal,renderEditAnimal} = require('../controllers/animals.controller')
const upload = require('../utils/handleUpload')

router.get('/add', renderAddAnimal)
router.get('/animal/:id',renderAnimal)
router.delete('/animal/:id', deleteAnimal)
router.get('/edit-animal/',renderEditAnimal)
router.post('/edit/:id',upload.single('image'), editAnimal)
router.post('/add', upload.single('image'), addAnimal)
router.post('/buscar', busquedaAnimal)
router.get('/', renderAnimales)
router.post('/solicitud', solicitudAnimal)

module.exports = router