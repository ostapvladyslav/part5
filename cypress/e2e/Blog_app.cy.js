describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Vladyslav Ostapchuk',
      username: 'test',
      password: 'testpass',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('contain', '')
    cy.get('#password').should('contain', '')
    cy.get('#login-button').should('contain', 'login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('testpass')
      cy.get('#login-button').click()

      cy.contains('Vladyslav Ostapchuk logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('testwrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Error: invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Vladyslav Ostapchuk logged in')
    })
  })
})
