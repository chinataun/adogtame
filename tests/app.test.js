const supertest = require('supertest')
const request = require('supertest')

const {app, server} = require('../app')

const api = supertest(app)


describe("POST /users", () => {
  describe.skip("Dando un usuario y contraseña", () => {

    test("Debería responder con un status code de 200", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })
    test("Debería especificar que es json en el content type de las cabeceras", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("debería devolver un userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  describe.skip("Cuando la contraseña o password no existe", () => {
    test("Debería responder con un status code dde 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })
afterAll(() => {
    server.close()
})
})