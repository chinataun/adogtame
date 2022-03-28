const express = require('express')
const router = express.Router()
const Animal = require('../models/Animal')
const {body, validationResult} = require('express-validator')
const {renderAnimales,  renderAddAnimal, addAnimal, busquedaAnimal} = require('../controllers/animals.controller')
const { validate } = require('../models/Animal')
const { error } = require('../utils/logger')
const { validateAddAnimal } = require('../utils/animal.validators')
const { animalValidate, checkRules } = require('../utils/animalValidator')



router.get('/add', renderAddAnimal)

// router.post('/add', validateAddAnimal, addAnimal)
router.post('/add', addAnimal)

router.post('/buscar', busquedaAnimal)

router.get('/', renderAnimales)

module.exports = router