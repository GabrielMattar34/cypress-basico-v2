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

        cy.get('#phone-checkbox').check()
            .should('be.checked')

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

    it('Seleciona um produto Youtube por seu texto', () => {
        cy.get('#product').select('youtube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto Mentoria por seu texto', () => {
        cy.get('#product').select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto Blog por seu indice', () => {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('Marcar o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check('feedback')
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('[type="checkbox"]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
            .should(function(input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type = "file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function(input) {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type = "file"').selectFile('@sampleFile')
            .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target')
            .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })

    it('Testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})