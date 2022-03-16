/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', () => {
        cy.title().should('be.eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Mattar')
        cy.get('#email').type('gabriel@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Mattar')
        cy.get('#email').type('gabriel@email')
        cy.get('#open-text-area').type(longText)
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Checar se o campo telefone continua vazio ao digitar um valor não-numerico', () => {
        cy.get('#phone').type('AAAA')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Mattar')
        cy.get('#email').type('gabriel@email.com')
        cy.get('#open-text-area').type(longText)

        cy.get('#phone-checkbox').click()

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = 'Teste Teste Teste Teste Teste Teste Teste Teste Teste'
        cy.get('#firstName').type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')
            
        cy.get('#lastName').type('Mattar')
            .should('have.value', 'Mattar')
            .clear()
            .should('have.value', '')

        cy.get('#email').type('gabriel@email.com')
            .should('have.value', 'gabriel@email.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone').type('9')
            .should('have.value', '9')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Utilizando cy.contains', () => {
        cy.contains('Nome').type('Gabriel')
        cy.contains('Sobrenome').type('Mattar')
        cy.contains('E-mail').type('gabriel@email.com')
        cy.contains('Telefone').type('9')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
})