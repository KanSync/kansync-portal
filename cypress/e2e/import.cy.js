describe('import and show board', () => {
    let token = Cypress.env("githubToken")
    before(() => {

      window.localStorage.setItem('Github', JSON.stringify({accessToken: token, expiresAt: null, refreshToken: null}))
    })

    beforeEach(() => {
      cy.visit('/')
    })
  
    it('import KanSync project and check its board', () => {
      cy.intercept('GET', 'https://local.functions.nhost.run/v1/github/?repo=*&projectName=*').as('importGithub')

      cy.contains('Dashboard').click()
      cy.get('input[placeholder*="Enter repository"]').type('KanSync/kansync-server')
      cy.get('input[placeholder*="Enter name of project"]').type('KanSync Project Planner')
      cy.get('.importButton').click()
      cy.wait('@importGithub', {responseTimeout: 15000})
      cy.get('[type="checkbox"]').check()
      cy.contains('Continue with selected boards').click()
      cy.contains('Kanban Board').click()
    })
})