const express = require('express');
const { check, validationResult } = require('express-validator');
const request = require('supertest');
const mongoose = require('mongoose')
const conection = require('../mongo')
const supertest = require('supertest')
const { validateAddAnimal } = require('../utils/animal.validators')
const { animalValidator } = require('../utils/animalValidator')
const {app, server}  = require('../app');
const { response } = require('express');

const api = supertest(app)

// describe('when handleValidationError returns something', () => {
//   beforeEach(async () => {
//    validationResult.mockImplementation(() => ({
//     isEmpty: jest.fn().mockReturnValue(false),
//     array: jest.fn().mockReturnValue([{ test: 'error' }])
//    }));
//    result = await response.validateRequest(req, res, {});
//   });

//   it('does not trigger getTokenData', () => {
//    expect(authentication.getTokenData).not.toHaveBeenCalled();
//   });
//  });

// test.only('email not string should fail', async () => {
//   let mockReq = httpMocks.createRequest({
//     method: 'post',
//     body: { email: 123 }
//   })
//   // console.log(mockReq)
//   await animalValidator(mockReq, mockRes, mockNext)
//   console.log(validationResult(mockReq))
//   // console.log(mockReq)
//   let error = mockNext.mock.calls[0][0]
//   expect(mockNext).toBeCalledWith(error)
//   expect(error.statusCode).toBe(400)
// })

// jest.mock('../utils/animal.validators', () => jest.fn((req, res, next) => next()));

// let agent;
// let server2;
// beforeEach(done => {
//   server2 = app.listen(4000, err => {
//     if (err) return done(err);

//     agent = supertest(server);
//     done();
//   });
// });

// afterEach(done => {
//   server && server.close(done);
// });

// describe('app', () => {
//   test('test middleware in app.js', async () => {
//     const response = await agent.post('/animales/add',[{ nombre: 'pop', tipo: 'asd', raza: 'asd', edad: 3, genero: 'asd', descripcion: 'asd' }]);
//     expect(response.status).toBe(200);
//     expect(validateAddAnimal).toHaveBeenCalledTimes(1);
//   });
// });


// app.post('/add', [
// 	check('email').isEmail(),
// 	check('password').isLength({ min: 5 })
// ], (req, res, next) => {
// 	// respond with 422 if there are errors
// });
// describe('akjsjdsalkkj', () => {

it('fails if invalid email or short password are passed', async () => {

const response = await api
		.post('/animales/add')
		.send({ nombre: 'pop', tipo: 'asd', raza: 'asd', edad: 3, genero: 'asd', descripcion: 'asd' })
		.expect(200);

		// console.log(response)
},7000);

it('fails if invalid email or short password are passed', async () => {

	const responses = await api
			.post('/animales/add')
			.send({ nombre: 'pop'})
			.expect(400)
      .expect(res => res.text.search('La descripción debe tener una longitud inferor a 100'))
      // .expect(function containsString(res) {
      //   if (res.text.indexOf('La descripción debe tener una longitud inferor a 100') == -1)
      //    throw new Error('Invalid translation string');
      //  })
      // .expect(responses.text).includes('tipo')
      // .expect((response) => {
      //   assert.ok(response.text.includes('El tipo debe tener 20 caracteres o menos'))
      // });
	
			// console.log(responses)
	},7000);
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
  mongoose.connection.close()
  // conection.connection.close()
  server.close();    

})
beforeAll((done /* Call it or remove it */ ) => {
  done(); // Calling it
});
// })