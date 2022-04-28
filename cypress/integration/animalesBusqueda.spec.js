describe('Busqueda animal por edad', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it.skip('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Busqueda con exito', () =>{
    it.skip('edad seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
    })
  })

  describe('Busqueda sin exito', () =>{
    it.skip('edad seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
      
    })
  })
})

describe('Busqueda animal por tipo', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it.skip('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Busqueda con exito', () =>{
    it.skip('tipo seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
    })
  })

  describe('Busqueda sin exito', () =>{
    it.skip('tipo seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
      
    })
  })
})

describe('Busqueda animal por raza', () =>{
  beforeEach(()=> {
    cy.visit('http://localhost:4000')
  })

  it.skip('frontpage can be opened', () => {
    cy.contains('ADOGTAME')
  })

  describe('Busqueda con exito', () =>{
    it.skip('raza seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
    })
  })

  describe('Busqueda sin exito', () =>{
    it.skip('raza seleccionada', () => {
      cy.visit('http://localhost:4000/animales')
      
    })
  })
})