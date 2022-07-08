import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import {customer, provider, appointment} from '../support/factories/dash'

describe('dashboard', () => {
    context('quando o cliente faz um agendamento no app mobile', () => {      

        before(() => {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            
            cy.setProviderId(provider.email)
            cy.createAppointMent(appointment.hour)
        });

        it('o mesmo deve ser exibido no dashboard', () => {
            loginPage.go()
            loginPage.form(provider)
            loginPage.submit()   
            
            dashPage.calendarShouldBeVisible()

            dashPage.selectDay(Cypress.env('appointmentDay'))
            dashPage.appointmentShouldBe(customer,appointment.hour)
            
        });
    });
});


