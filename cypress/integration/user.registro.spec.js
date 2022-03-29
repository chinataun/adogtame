describe('Animales', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it.skip('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Registro usuario', () =>{
    it.skip('Registro vacío', () => {
      cy.visit('http://localhost:4000/users/registro')
      cy.get('button.btn').click()
      cy.contains('Inserta email')
      cy.contains('La contraseña debe contener entre 8 y 20 caracteres')
    })
   })
})