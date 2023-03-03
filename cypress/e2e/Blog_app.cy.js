describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#Username').should('contain', '')
    cy.get('#Password').should('contain', '')
    cy.get('#login-button').should('contain', 'login')
  })
})
