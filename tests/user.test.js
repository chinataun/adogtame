const validations = require('../utils/service.validations')

const validationsUser = require('../utils/service.validations.user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server}  = require('../app');
const api = supertest(app)


describe('Registro basico de usuario', () => {

  test.skip("Formato invalido sin @", () => {
    expect(validationsUser.validateEmail("Beethoven")).toBe('Formato de email invalido. Ej: aaa@aaa.com')
  })
  test.skip("Formato invalido con @ sin .*", () => {
    expect(validationsUser.validateEmail("Beethoven@asd")).toBe('Formato de email invalido. Ej: aaa@aaa.com')
  })
  test.skip("Formato valido", () => {
    expect(validationsUser.validateEmail("Beethoven@gmail.com")).toBe('')
  })

  test.skip("Las constraseñas son obligatorias", () => {
    expect(validationsUser.validatePassword('','')).toBe('Las constraseñas son obligatorias')
  })
  test.skip("La contraseña debe tener numero", () => {
    expect(validationsUser.validatePassword("asd","asd")).toBe('La contraseña debe tener un numero')
  })
  test.skip("LA contraseña debe tener letra", () => {
    expect(validationsUser.validatePassword("123","123")).toBe('La contraseña debe tener una letra')
  })
  test.skip("Las contraseñas no coindicen", () => {
    expect(validationsUser.validatePassword("ads", "klj")).toBe('Las contraseñas no coinciden')
  })
  test.skip("La contraseña debe tener mas de 8 caracteres", () => {
    expect(validationsUser.validatePassword("asdasd4", "asdasd4")).toBe('La contraseña debe tener mas de 8 caracteres')
  })
  test.skip("Contraseñas correctas", () => {
    expect(validationsUser.validatePassword("contraseña1","contraseña1")).toBe('')
  })

  test.skip("Sin Rol Obligatorio", () => {
    expect(validationsUser.validateRoleUser("Adoptante")).toBe('')
  })

  
  test.skip("Con Rol Obligatorio", () => {
    expect(validationsUser.validateRoleUser(undefined)).toBe('Rol obligatorio')
  })

  const requestDone = { 
    body: {
      email: 'test@test.com',
      password: 'password1',
      confirm_password: 'password1',
      role: 'Adoptante'
    }
  }

  const requestFail = { 
    body: {
      email: 'test@test.com',
      password: 'password1',
      confirm_password: 'passrd1',
      role: 'Adoptante'
    }
  }

  test.skip("registro basico done", () => {
    expect(validationsUser.validateUser(requestDone)).toStrictEqual({})
  })

  test.skip("registro basico fail", () => {
    expect(validationsUser.validateUser(requestFail)).toStrictEqual({password: 'Las contraseñas no coinciden'})
  })


  afterAll(() => {
    mongoose.connection.close()
    server.close() 
  
  })


})
