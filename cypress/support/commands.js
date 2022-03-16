
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Mattar')
    cy.get('#email').type('gabriel@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})