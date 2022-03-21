const express = require('express')
const router = express.Router()
const Animal = require('../models/Animal')
const {body, validationResult} = require('express-validator')
const {renderAnimales, renderAddAnimal, addAnimal} = require('../controllers/animal.controller')
const { validate } = require('../models/Animal')
const { error } = require('../utils/logger')
const { validateAddAnimal } = require('../utils/animal.validators')

router.get('/add', renderAddAnimal)


router.post('/add', validateAddAnimal, addAnimal)

router.get('/', renderAnimales)

module.exports = router