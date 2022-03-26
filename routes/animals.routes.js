const router = require('express').Router()
const {renderAnimals, renderAddAnimal, addAnimal} = require('../controllers/animal.controller')
const { animalValidate, checkRules } = require('../utils/animalValidator')
const { validateAddAnimal } = require('../utils/animal.validators')

router.get('/', renderAnimals)
router.get('/add', renderAddAnimal)
router.post('/add', validateAddAnimal, addAnimal)


module.exports = router