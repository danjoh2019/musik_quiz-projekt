describe('First system test', () => {
  it('passes', () => {
    cy.visit('/')

    cy.title().should('eq', 'Musikquiz')

    // Click on the Quiz 'button'
    cy.contains('Quiz').click()

    // Verify that the router redirected correct
    cy.url().should('include', '/category')

    // Click on the Pop category
    cy.contains('pop').click()

    // Wait until the quiz has loaded and the loading icon is gone
    cy.get('.loader-circle-7', { timeout: 15000 }).should('not.exist')

    // Get the total number of guesses and then click on a option and verify that the
    // total number of guesses has increased with one.
    cy.get('#progress>div:nth-child(3)').invoke('text').then(parseFloat).then((($div) => {
      const val = $div

      cy.get('.options .options-container p').first().click()
      cy.get('#progress>div:nth-child(3)').invoke('text').then(parseFloat).should('eq', val + 1)
    }))

  })
})