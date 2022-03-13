const validatePassword = require('../utils/validatePassword.js')
const {app, server} = require('../app')

test("Falso si la contraseña está vacía", () => {
  expect(validatePassword("")).toBe(false)
})
test("Falso si la contraseña no contiene numeros", () => {
  expect(validatePassword("aksjgkaasdf")).toBe(false)
})
test("Falso si la contraseña no contiene letras", () => {
  expect(validatePassword("1251234563246")).toBe(false)
})
test("Verdadero si la contraseña contiene numeros, letras y la longitud es mayor que 8 caracteres", () => {
  expect(validatePassword("12512ajskdhgk")).toBe(true)
})
test("Falso si la contraseña contiene numeros, letras y la longitud es menor que 8 caracteres", () => {
  expect(validatePassword("a1")).toBe(false)
})
test("Verdadero si la contraseña tiene numeros, letras mayúsculas y la longitud es mayor que 8 caracteres", () => {
  expect(validatePassword("12512ASDFA")).toBe(true)
})
test("Verdadero si la contraseña tiene numeros, letras mayúsculas y la longitud es mayor que 8 caracteres", () => {
  expect(validatePassword("12512ASDasdfasd")).toBe(true)
})

afterAll(() => {
    server.close()
})