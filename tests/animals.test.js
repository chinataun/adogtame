const express = require('express');
const { check, validationResult } = require('express-validator');
const validations = require('../utils/service.validations')
const request = require('supertest');
const mongoose = require('mongoose')
const supertest = require('supertest')
const { validateAddAnimal } = require('../utils/animal.validators')
const animalValidator = require('../utils/animalValidator')
const {app, server}  = require('../app');
const { response } = require('express');
const { NextFunction, Request, Response } = require('express')
const api = supertest(app)

const sinon = require('sinon');
const { array } = require('../utils/handleUpload');

// describe('akjsjdsalkkj', () => {

// it('fails if invalid email or short password are passed', async () => {

// const response = await api
// 		.post('/animales/add')
// 		.send({ nombre: 'pop', tipo: 'asd', raza: 'asd', edad: 3, genero: 'asd', descripcion: 'asd' })
// 		.expect(200);

// 		// console.log(response)
// },7000);

// it('fails if invalid email or short password are passed', async () => {

// 	const responses = await api
// 			.post('/animales/add')
// 			.send({ nombre: 'pop'})
// 			.expect(400)
//       .expect(res => res.text.search('La descripción debe tener una longitud inferor a 100'))
//       // .expect(function containsString(res) {
//       //   if (res.text.indexOf('La descripción debe tener una longitud inferor a 100') == -1)
//       //    throw new Error('Invalid translation string');
//       //  })
//       // .expect(responses.text).includes('tipo')
//       // .expect((response) => {
//       //   assert.ok(response.text.includes('El tipo debe tener 20 caracteres o menos'))
//       // });
	
// 			// console.log(responses)
// 	},7000);
// test('fails if fields are passed', async () => {

// 	await api.post('/animales/add')
// 		.send({nombre:'jesus'})
// 		// .send({ 
// 		// 	nombre: 'sadasd',
// 		// 	tipo: 'asdsad',
// 		// })
// 		// .expect(400)
// 		// .end(function(err, res){
// 		// 	res.body.errors.firstName.should.have.property("path")
// 		// 	done();
// 		// });
// 		.expect(200)

// 		// const response = await api.post('/animales/add').send({ nombre: 'asdsdafsdafsdafsadfasdfasdfasdfsadfasdfasdfasdfasdfdsfsdfasdfsadfasdfsd' })

// });


// test('fails if fields are passedasdasd', async () => {
// 	await api
// 		.get('/animales/add')
// 		.expect(200);
// });

 // closing the server

//  afterEach(() => {
    
  
// });
afterAll(() => {
  mongoose.disconnect()
  // conection.connection.close()
  server.close();    

})
beforeAll((done /* Call it or remove it */ ) => {
  done(); // Calling it
});
// })


describe('Test de validación de registro animal', () => {
const request = { 
  file: {
    fieldname: 'image',
    originalname: 'tortuga.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: './public/uploads',
    filename: '1648483850133.png',
    path: 'public/uploads/1648483850133.png',
    size: 3132
  },
  body: {
    nombre: '',
    tipo: '',
    raza: '',
    edad: '',
    descripcion: ''
  }
}
// NOmbre
test("returns false for empty name", () => {
  expect(validations.validateDescripciónAnimal()).toBe('Campo Obligatorio')
})
test("returns false for more than 50 chars name", () => {
  expect(validations.validateNombreAnimal("BeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethoven")).toBe(false)
})
test("returns true for valid name", () => {
  expect(validations.validateNombreAnimal("Beethoven")).toBe(true)
})
//tipo
test("returns false for empty name", () => {
  expect(validations.validateDescripciónAnimal()).toBe('Campo Obligatorio')
})
test("returns false for more than 50 chars name", () => {
  expect(validations.validateNombreAnimal("BeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethoven")).toBe(false)
})
test("returns true for valid name", () => {
  expect(validations.validateNombreAnimal("Perro")).toBe(true)
})

//raza
test("returns false for empty name", () => {
  expect(validations.validateDescripciónAnimal()).toBe('Campo Obligatorio')
})
test("returns false for more than 50 chars name", () => {
  expect(validations.validateNombreAnimal("BeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethoven")).toBe(false)
})
test("returns true for valid name", () => {
  expect(validations.validateNombreAnimal("Beethoven")).toBe(true)
})

test("returns false for empty name", () => {
  expect(validations.validateDescripciónAnimal()).toBe('Campo Obligatorio')
})
test("returns false for more than 50 chars name", () => {
  expect(validations.validateNombreAnimal("BeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethoven")).toBe(false)
})
test("returns true for valid name", () => {
  expect(validations.validateNombreAnimal("Beethoven")).toBe(true)
})


test.skip("returns false for password without numbers", () => {
  expect(validatePassword("aksjgkaasdf")).toBe(false)
})
test.skip("returns false for password without letters", () => {
  expect(validatePassword("1251234563246")).toBe(false)
})
test.skip("returns true for password with numbers, letters, >= 8 characters", () => {
  expect(validatePassword("12512ajskdhgk")).toBe(true)
})
test.skip("returns false for password with numbers, letters, < 8 characters", () => {
  expect(validatePassword("a1")).toBe(false)
})
test.skip("returns true for password with numbers, uppercase letters, and >= 8 characters", () => {
  expect(validatePassword("12512ASDFA")).toBe(true)
})
test.skip("returns true for password with numbers, uppercase and lowercase letters, and >= 8 characters", () => {
  expect(validatePassword("12512ASDasdfasd")).toBe(true)
})

test.skip("returns true for valid name", () => {
  expect(validations.validateAnimal(request)).toEqual([])
})


afterAll(() => {
  mongoose.disconnect()
  // conection.connection.close()
  server.close();    

})
beforeAll((done /* Call it or remove it */ ) => {
  done(); // Calling it
});
})