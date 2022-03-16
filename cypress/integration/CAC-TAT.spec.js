/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', () => {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Mattar')
        cy.get('#email').type('gabriel@email.com')
        cy.get('#open-text-area').type('Teste Teste Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

})