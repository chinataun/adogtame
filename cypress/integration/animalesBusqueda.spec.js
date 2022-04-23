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