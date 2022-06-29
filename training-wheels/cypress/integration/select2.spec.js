
it('deve selecionar uma unica opcao', () => {
    cy.visit('/apps/select2/index.html')

    cy.get('.select2-selection--single').click()

    cy.contains('.select2-results__option', 'Cypress').click()
});

it('deve selecionar multiplas opcoes', () => {
    cy.visit('/apps/select2/index.html')

    const frameworks = [
        'Cypress',
        'Robot Framework',
        'Protractor'
    ]

    frameworks.forEach((framework) => {
        cy.get('.select2-selection--multiple').click()
        cy.contains('.select2-results__option', framework).click()
    })

    // cy.get('.select2-selection--multiple').click()  
    // cy.contains('.select2-results__option','Cypress').click()

    // cy.get('.select2-selection--multiple').click()  
    // cy.contains('.select2-results__option','Robot Framework').click()

    // cy.get('.select2-selection--multiple').click()  
    // cy.contains('.select2-results__option','Protractor').click()
});