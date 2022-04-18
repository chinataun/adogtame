const express = require('express');
const { check, validationResult } = require('express-validator');
const validations = require('../utils/service.validations')
const request = require('supertest.skip');
const mongoose = require('mongoose')
const supertest = require('supertest.skip')
const { validateAddAnimal } = require('../utils/animal.validators')
const animalValidator = require('../utils/animalValidator')
const {app, server}  = require('../app');
const api = supertest.skip(app)



// it.skip('fails if invalid email or short password are passed', async () => {

// 	const responses = await api
// 			.post('/animales/add')
// 			.send({ nombre: 'pop'})
// 			.expect(400)
//       .expect(res => res.text.search('La descripción debe tener una longitud inferor a 100'))
//       // .expect(function containsString(res) {
//       //   if (res.text.indexOf('La descripción debe tener una longitud inferor a 100') == -1)
//       //    throw new Error('Invalid translation string');
//       //  })
//       // .expect(responses.text).includes('Género obligatorio')
//       // .expect((response) => {
//       //   assert.ok(response.text.includes('El tipo debe tener 20 caracteres o menos'))
//       // });
	
// 			// console.log(responses)
// 	},7000);
// test.skip('fails if fields are passed', async () => {

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


// test.skip('fails if fields are passedasdasd', async () => {
// 	await api
// 		.get('/animales/add')
// 		.expect(200);
// });

 // closing the server

//  afterEach(() => {
    
  
// });

beforeAll(() => {
  const request = { 
    file: {
      fieldname: 'image',
      originalname: 'tortuga.png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './public/uploads',
      filename: '1648483850133.png',
      path: 'public/uploads/1648483850133.png',
      size: '202',
    },
    body: {
      nombre: '',
      tipo: '',
      raza: '',
      edad: '',
      genero: '',
      descripcion: ''
    }
  }
});
// })

describe('test.skip funciones auxiliares', () => {

  test.skip("TRUE si el campo esta vacio", () => {
    expect(validations.obligatorio('')).toBe(true)
  })
  
  test.skip("TRUE si es mas de 20 caracteres", () => {
    expect(validations.validLength('Contrary to popular belief, Lorem Ipsum is not simply', 20)).toBe(true)
  })
})

describe('test.skips registro animal', () => {

describe('Campos de texto obligatorios o con un maximo de caracteres. Vale para nombre, tipo, raza, descripcion', () => {
  test.skip("Error Vacío para nombre valido", () => {
    expect(validations.validateNombreAnimal("Beethoven")).toBe('')
  })

  test.skip("Nombre obligatorio", () => {
    expect(validations.validateNombreAnimal('')).toBe('Nombre obligatorio')
  })
  test.skip("Nombre menor de 20 caracteres", () => {
    expect(validations.validateNombreAnimal("BeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethovenBeethoven")).toBe('El nombre no puede tener mas de 20 caracteres')
  })

  test.skip("descripcion max longitud", () => {
    expect(validations.validateDescripciónAnimal('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.')).toBe('La descripción no puede tener mas de 500 caracteres')
  })
})

describe('Edad y genero', () => {
  test.skip("Edad mayor que cero devuelve string vacio (sin errores)", () => {
    expect(validations.validateEdadAnimal(2)).toBe('')
  })

  test.skip("Edad = 0", () => {
    expect(validations.validateEdadAnimal(0)).toBe('La edad tiene que ser mayor que 0')
  })

  test.skip("Genero obligatorio (Select)", () => {
    expect(validations.validateGeneroAnimal(undefined)).toBe('Género obligatorio')
  })
})

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

  describe('Registro completo. Se devuelve un array con errores o vacío', () => {
    const requestFail = { 
      body: {
        nombre: '',
        tipo: '',
        raza: '',
        edad: '',
        descripcion: ''
      }
    }

    const requestDone = { 
      body: {
        nombre: 'Beethoven',
        tipo: 'Perro',
        raza: 'San bernardo',
        genero: 'Macho'
      }
    }


  test.skip("Registro con campos vacíos", () => {
    expect(validations.validateAnimal(requestFail)).toEqual(["Nombre obligatorio", "Tipo obligatorio", "Raza obligatoria", "Género obligatorio"])  
  })

  test.skip("Registro valido", () => {
    expect(validations.validateAnimal(requestDone)).toEqual([])  
  })

  })

  describe('Registro no valido al hacer la llamada', () => {
    const requestFail = { 
      body: {
        nombre: 'Beethoven',
        tipo: 'Perro',
        raza: 'San bernardo',
        genero: ''
      }
    }
    const requestDone = { 
      body: {
        nombre: 'Beethoven',
        tipo: 'Perro',
        raza: 'San bernardo',
        genero: 'Macho'
      }
    }
    it.skip('Devolvemos un 200 cuando el registro es valido', async () => {
      const response = await api
        .post('/animales/add')
        .send(requestFail)
        expect(200)
        expect(response.text).toContain('Género obligatorio');
    });
    it.skip('Devolvemos un 200 cuando el registro es valido', async () => {
      const response = await api
        .post('/animales/add')
        .send(requestDone)
        expect(200)
        expect(response.text).toContain('Género obligatorio');
    });
  })
})



// test.skip("returns false for password without numbers", () => {
//   expect(validatePassword("aksjgkaasdf")).toBe(false)
// })
// test.skip("returns false for password without letters", () => {
//   expect(validatePassword("1251234563246")).toBe(false)
// })
// test.skip("returns true for password with numbers, letters, >= 8 characters", () => {
//   expect(validatePassword("12512ajskdhgk")).toBe(true)
// })
// test.skip("returns false for password with numbers, letters, < 8 characters", () => {
//   expect(validatePassword("a1")).toBe(false)
// })
// test.skip("returns true for password with numbers, uppercase letters, and >= 8 characters", () => {
//   expect(validatePassword("12512ASDFA")).toBe(true)
// })
// test.skip("returns true for password with numbers, uppercase and lowercase letters, and >= 8 characters", () => {
//   expect(validatePassword("12512ASDasdfasd")).toBe(true)
// })

// test.skip("returns true for valid name", () => {
//   expect(validations.validateAnimal(request)).toEqual([])
// })




})
afterAll(() => {
  mongoose.connection.close()
  server.close() 

})