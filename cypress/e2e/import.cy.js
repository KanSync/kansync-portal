describe('import and show board', () => {
    before(() => {
      window.localStorage.setItem('Github', JSON.stringify({accessToken: Cypress.env('githubToken'), expiresAt: null, refreshToken: null}))
    })

    beforeEach(() => {
      window.localStorage.setItem('Github', JSON.stringify({accessToken: Cypress.env('githubToken'), expiresAt: null, refreshToken: null}))
      cy.visit('/')
    })
  
    it('import KanSync project', () => {
      cy.contains('Dashboard').click()
      cy.get('input[placeholder*="Enter repository"]').type('KanSync/KanSync-server')
      cy.get('input[placeholder*="Enter name of project"]').type('KanSync Project Planner')
      cy.get('.importButton').click()
    })
})