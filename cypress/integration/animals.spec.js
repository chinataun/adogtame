describe('Animales', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Añadir animal', () =>{
    it('login form can be opened', () => {
      cy.visit('http://localhost:4000/animales/add')
      cy.get('[placeholder="Nombre"]').type('Betthoven')
      cy.get('[placeholder="Tipo"]').type('Perro')
      cy.get('[placeholder="Raza"]').type('San bernardo')
      cy.get('[placeholder="Edad"]').type('2')
      cy.get('.form-check-inline [type="radio"]')
      .check('Macho', { force: true }).should('be.checked')
      cy.get('button[type="submit"]').click()
      cy.contains('Añadido con éxito')
    })
  })

  describe('Error al añadir animal', () =>{
    it('login form can be opened', () => {
      cy.visit('http://localhost:4000/animales/add')
      cy.get('[placeholder="Nombre"]').type('Betthoven')
      cy.get('[placeholder="Raza"]').type('San bernardo')
      cy.get('[placeholder="Edad"]').type('2')
      cy.get('.form-check-inline [type="radio"]')
      .check('Macho', { force: true }).should('be.checked')
      cy.get('button[type="submit"]').click()
      cy.contains('Tipo obligatorio')
    })
  })
})