/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    it('Verifica o titulo da aplicação', () => {
        cy.visit('./src/index.html')
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })
})