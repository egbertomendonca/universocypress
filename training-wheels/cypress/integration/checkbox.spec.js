it('deve marcar os top 5 filmes da marvel', () => {
    cy.visit('/checkboxes')

    const movies = [
        'avengers',
        'cap2',
        'guardians',
        'blackpanther',
        'thor3'
    ]

    movies.forEach(m => {
        cy.get(`input[name=${m}]`)
        .click()
        .should('be.checked')
    })
});