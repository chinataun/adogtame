
const supertest = require('supertest')
const {app, server}  = require('../app');
const api = supertest(app)
const mongoose = require('mongoose')

describe('Imagen', () => {
    const normalfile = { 
      file: {
        fieldname: 'image',
        originalname: 'tortuga.png',
        encoding: '7bit',
        mimetype: 'image/png',
        destination: './public/uploads',
        filename: '1648483850133.png',
        path: 'public/uploads/1648483850133.png',
        size: 2097152,
      },
    }
  
    const fileExceded = {
      file: {
        mimetype: 'image/png',
        size:30000000000,
      }
    }
  
    const fileErrorType = {
      file: {
        mimetype: 'image/pdf',
        size: 20000,
      }
    }
  
    test.skip("Si hay imagen, el mimetype debe ser válido y un tamaño minimo", () => {
      expect(validations.validateImageAnimal(normalfile.file)).toBe('')
    })
  
    test.skip("Si hay imagen y el tamazon excede, se devuelve error", () => {
      expect(validations.validateImageAnimal(fileExceded.file)).toBe('Tamaño de archivo excedido. Max: 2MB')
    })
  
    test.skip("Si hay imagen y el tamazon excede, se devuelve error", () => {
      expect(validations.validateImageAnimal(fileErrorType.file)).toBe('Tipo de archivo no soportado. Tipos validos: jpg, png o gif')
    })
  
  })


