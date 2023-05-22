describe('First system test', () => {
  it('passes', () => {
    cy.visit('/')

    cy.title().should('eq', 'Musikquiz')

    cy.contains('Quiz').click()

    cy.url().should('include', '/category')

    cy.contains('pop').click()

    cy.get('.loader-circle-7', { timeout: 15000 }).should('not.exist')

    cy.get('#progress>div:nth-child(3)').invoke('text').then(parseFloat).then((($div) => {
      const val = $div

      cy.get('.options .options-container p').first().click()
      cy.get('#progress>div:nth-child(3)').invoke('text').then(parseFloat).should('eq', val + 1)
    }))

  })
})