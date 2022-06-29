
it('selecionar a data de nascimento', () => {
    cy.visit('/datepicker')

    const date = {
        month: 'Feb',
        year:'1983',
        day: '1'
    }
    // day: /^1$/g
    

    cy.get('.datetimepicker-dummy-input').click()

    cy.get('.datepicker-nav-month').click()
    // cy.get('[data-month="02"]').click()
    cy.contains('.datepicker-month',date.month).click()

    cy.get('.datepicker-nav-year').click()
    cy.contains('.datepicker-year span',date.year).click()

    cy.contains('button[class=date-item]', new RegExp('^' + date.day + '$','g')).click()

});