describe('Busqueda protectora por ciudad', () =>{
    beforeEach(()=> {
      cy.visit('http://localhost:4000')
    })
  
    it.skip('frontpage can be opened', () => {
      cy.contains('ADOGTAME')
    })
  
    describe('Busqueda con exito', () =>{
      it.skip('Ciudad seleccionada', () => {
        cy.visit('http://localhost:4000/users/protectoras')
      })
    })
  
    describe('Busqueda sin exito', () =>{
      it.skip('Ciudad seleccionada', () => {
        cy.visit('http://localhost:4000/users/protectoras')
        
      })
    })
  })