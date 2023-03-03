describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Vladyslav Ostapchuk',
      username: 'test',
      password: 'testpass',
    }
    const user2 = {
      name: 'Second User',
      username: 'test2',
      password: 'testpass',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
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

      cy.get('html').should('contain', 'Vladyslav Ostapchuk logged in')
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'testpass' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#blogTitle').type('A new blog')
      cy.get('#blogAuthor').type('Exciting Author')
      cy.get('#blogUrl').type('https://google.com/')
      cy.get('#create-button').click()
      cy.get('html').should('contain', 'A new blog Exciting Author')
    })

    describe('and one blog already exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First title',
          author: 'New Author',
          url: 'https://example.com',
        })
      })

      it('user can click "like" button on a blog', function () {
        cy.contains('view').click()
        cy.get('.btnLike').click()
        cy.get('.blogLikes').should('contain', '1')
        cy.get('.btnLike').click()
        cy.get('.blogLikes').should('contain', '2')
      })

      it('creator can delete his blog', function () {
        cy.contains('view').click()
        cy.get('#btnRemove').click()
        cy.get('html').should('not.contain', 'First Title New Author')
      })

      it('other user dont see delete button', function () {
        cy.contains('logout').click()
        cy.get('#username').type('test2')
        cy.get('#password').type('testpass')
        cy.get('#login-button').click()

        cy.get('html').should('contain', 'Second User logged in')
        cy.contains('view').click()
        cy.get('.blog').should('not.contain', 'remove')
      })
    })
  })
})
