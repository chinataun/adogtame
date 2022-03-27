const express = require('express')
const router = express.Router()
const Animal = require('../models/Animal')
const {body, validationResult} = require('express-validator')
const {renderAnimales, renderAnimal, renderAddAnimal, addAnimal, busquedaAnimal} = require('../controllers/animal.controller')
const { validate } = require('../models/Animal')
const { error } = require('../utils/logger')
const upload = require('../utils/handleUpload')
const { validateAddAnimal } = require('../utils/animal.validators')
const { animalValidate, checkRules } = require('../utils/animalValidator')



router.get('/add', renderAddAnimal)
router.get('/animal/:id', renderAnimal)

// router.post('/add', validateAddAnimal, addAnimal)
router.post('/add', upload.single('image'), addAnimal)

router.post('/buscar', busquedaAnimal)

router.get('/', renderAnimales)

module.exports = router