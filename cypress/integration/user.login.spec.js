describe('Animales', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it.skip('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Login password incorrect', () =>{
    it.skip('login form can be opened', () => {
      cy.visit('http://localhost:4000/users/login')
      cy.contains('Iniciar sesión')
      cy.get('[placeholder="Email"]').type('jesusvelez@ucm.es')
      cy.get('[placeholder="Password"]').type('Perro')
      cy.get('button.btn').click()
      cy.contains('Contraseña incorrecta')
    })
  })

  describe('Login password incorrect', () =>{
    it.skip('login form can be opened', () => {
      cy.visit('http://localhost:4000/users/login')
      cy.contains('Iniciar sesión')
      cy.get('[placeholder="Email"]').type('mala@ucm.es')
      cy.get('[placeholder="Password"]').type('plokuh')
      cy.get('button.btn').click()
      cy.contains('Usuario no encontrado')
    })
  })

  describe('Login correct', () =>{
    it.skip('login form can be opened', () => {
      cy.visit('http://localhost:4000/users/login')
      cy.contains('Iniciar sesión')
      cy.get('[placeholder="Email"]').type('jesusvelez@ucm.es')
      cy.get('[placeholder="Password"]').type('plokijuh')
      cy.get('button.btn').click()
      cy.contains('Añadir animales')
    })
  })
})