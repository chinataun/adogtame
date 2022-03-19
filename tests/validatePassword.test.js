const validatePassword = require('../utils/validatePassword.js')

test.skip("returns false for empty password", () => {
  expect(validatePassword("")).toBe(false)
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