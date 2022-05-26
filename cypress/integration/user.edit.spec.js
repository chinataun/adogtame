describe('Edición de usuario', () =>{
    beforeEach(()=> {
      cy.visit('http://localhost:4000')
    })
  
    it.skip('frontpage can be opened', () => {
      cy.contains('ADOGTAME')
    })
  
    describe('Adoptante', () =>{
      it.skip('Êxito', () => {
        cy.visit('http://localhost:4000/users/edit-adoptante')
        cy.get('button.btn').click()
      })
      it.skip('Error', () => {
        cy.visit('http://localhost:4000/users/edit-adoptante')
        cy.get('button.btn').click()
      })
     })

  })