describe('import and show board', () => {
    let githubToken = Cypress.env("githubToken")
    let jiraToken = Cypress.env("jiraToken")
    let trelloToken = Cypress.env("trelloToken")

    beforeEach(() => {
      cy.visit('/')
      window.localStorage.setItem('Github', JSON.stringify({accessToken: githubToken, expiresAt: null, refreshToken: null}))
      window.localStorage.setItem('Jira', JSON.stringify({accessToken: jiraToken, expiresAt: 1703151599689, refreshToken: null}))
      window.localStorage.setItem('Trello', JSON.stringify({accessToken: trelloToken, expiresAt: null, refreshToken: null}))
    })
  
    it('import Github project and check its board', () => {
      cy.intercept('GET', 'https://local.functions.nhost.run/v1/github/?repo=*&projectName=*').as('importGithub')

      cy.contains('Dashboard').click()
      cy.get('input[placeholder*="Enter repository"]').type('KanSync/kansync-server')
      cy.get('input[placeholder*="Enter name of project"]').type('KanSync Project Planner')
      cy.get('.importButton').click()
      cy.wait('@importGithub', {responseTimeout: 10000})
      cy.get('[type="checkbox"]').check()
      cy.contains('Continue with selected boards').click()
      cy.contains('Kanban Board').click()
    })

    it('import Jira project and check its board', () => {
      cy.intercept('GET', 'https://local.functions.nhost.run/v1/jira/?projectKey=*&name=*').as('importJira')

      cy.contains('Dashboard').click()
      cy.contains('Jira').click()
      cy.get('input[placeholder*="Enter project key of repository"]').type('KAN')
      cy.get('input[placeholder*="Enter domain of repository"]').type('iwouldliketotestthis')
      cy.get('.importButton').click()
      cy.wait('@importJira', {responseTimeout: 10000})
      cy.contains('Jira').click()
      cy.get('[type="checkbox"]').check()
      cy.contains('Continue with selected boards').click()
      cy.contains('Kanban Board').click()
    })

    it('import Trello project and check its board', () => {
      cy.intercept('GET', 'https://local.functions.nhost.run/v1/trello/?boardId=*').as('importTrello')

      cy.contains('Dashboard').click()
      cy.contains('Trello').click()
      cy.get('input[placeholder*="Enter board ID of repository"]').type('5Mvk8PYn')
      cy.get('.importButton').click()
      cy.wait('@importTrello', {responseTimeout: 10000})
      cy.get('[type="checkbox"]').check()
      cy.contains('Continue with selected boards').click()
      cy.contains('Kanban Board').click()
    })
})