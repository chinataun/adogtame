const router = require('express').Router()
const {renderAnimales,  renderAddAnimal, addAnimal, busquedaAnimal, renderAnimal} = require('../controllers/animals.controller')
const upload = require('../utils/handleUpload')

router.get('/add', renderAddAnimal)
router.get('/animal/:id',renderAnimal)
router.post('/add', upload.single('image'), addAnimal)
router.post('/buscar', busquedaAnimal)
router.get('/', renderAnimales)

module.exports = router