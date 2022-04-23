const router = require('express').Router()
const {renderAnimales,  renderAddAnimal,solicitudAnimal, addAnimal, busquedaAnimal, renderAnimal,deleteAnimal,renderEditAnimal,editAnimal} = require('../controllers/animals.controller')
const upload = require('../utils/handleUpload')

router.get('/add', renderAddAnimal)
router.get('/animal/:id',renderAnimal)
router.delete('/animal/:id', deleteAnimal)
router.post('/add', upload.single('image'),upload.single('file'), addAnimal)
router.post('/buscar', busquedaAnimal)
router.get('/', renderAnimales)
router.get('/edit-animal/',renderEditAnimal)
router.post('/edit/:id',upload.single('image'),upload.single('file'), editAnimal)
router.post('/solicitud', solicitudAnimal)

module.exports = router