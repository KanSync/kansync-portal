describe('KanSync login', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('login user to main account', () => {
      cy.contains('Login').click()
      cy.get('input[placeholder*="Nickname"]').type('Tom')
      cy.get('.loginButton').click()
    })
})