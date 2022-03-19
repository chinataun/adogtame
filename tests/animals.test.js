const express = require('express');
const { check } = require('express-validator');
const request = require('supertest');
const mongoose = require('mongoose')
const conection = require('../mongo')
const supertest = require('supertest')

const {app, server}  = require('../app')

const api = supertest(app)






// app.post('/add', [
// 	check('email').isEmail(),
// 	check('password').isLength({ min: 5 })
// ], (req, res, next) => {
// 	// respond with 422 if there are errors
// });

// it('fails if invalid email or short password are passed', done => {
// 	api
// 		.post('/add')
// 		.send({ nombre: 'pop', tipo: 'asd', raza: 'asd', edad: 'asd', genero: 'asd', descripcion: 'asd' })
// 		.expect(422, done);
// });

test('fails if fields are passed', async () => {
	await api
		.post('/animales/add')
		.send({ nombre: '' })
		.expect(403);
});
 // closing the server
//  afterEach(() => {
    
  
// });
afterAll(() => {
  // mongoose.connection.close()
  // conection.connection.close()
  server.close();    

})