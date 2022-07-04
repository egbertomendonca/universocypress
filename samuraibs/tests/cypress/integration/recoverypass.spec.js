import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('resgate de senha', () => {
    before(() => {
        cy.fixture('recovery')
        .then((recovery) =>{
            globalThis.data = recovery
        })
    });

    context('quando o usuário esquece a senha', () => {
        before(() => {
            cy.postUser(globalThis.data)
        });

        it('deve poder resgatar por email', () => {
            fpPage.go()
            fpPage.form(globalThis.data.email)
            fpPage.submit()

            const message = "Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada."
            fpPage.toast.shouldHaveText(message)
        });
    });

    context('quando o usuário solicita o restage', () => {
        before(() => {
            cy.postUser(globalThis.data)
            cy.recoveryPass(globalThis.data.email)
        });

        it('deve poder cadastrar uma nova senha', () => {
           const token = Cypress.env('recoveryToken')
           rpPage.go(token)
           rpPage.form('abc123','abc123') 
           rpPage.submit()

           const message = 'Agora você já pode logar com a sua nova senha secreta.'
           rpPage.toast.shouldHaveText(message)

        });
    });
});