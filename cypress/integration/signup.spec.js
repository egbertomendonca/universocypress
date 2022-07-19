//  biblioteca: yarn add @faker-js/faker -D
// biblioteca: postgress: yarn add pg -D
// https://node-postgres.com/
// https://fakerjs.dev/guide/#node-js
// import { faker } from '@faker-js/faker';

import signupPage from '../support/pages/signup'

describe('cadastro', () => {
    

    before(() => {
        cy.fixture('signup').then(function(signup){
           globalThis.sucess = signup.sucess 
           globalThis.email_dup = signup.email_dup 
           globalThis.email_inv = signup.email_inv 
           globalThis.short_password = signup.short_password        
                  
        })
    });

    context('quando o  usuário é novato', () => {

        before(() => {
            cy.task('removeUser',globalThis.sucess.email)
                .then((result) => {
                    console.log(result)
                })
        });

        it('deve cadastrar com sucesso', () => {
            // cy.intercept('POST', '/users', {
            //     statusCode: 200
            // }).as('postUser')
            // cy.wait('@postUser')

            signupPage.go()
            signupPage.form(globalThis.sucess)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    });

    context('quando o email já existe', () => {

        before(() => {
            cy.postUser(globalThis.email_dup)
        });

        it('não deve cadastrar o usuário', () => {
            signupPage.go()
            signupPage.form(globalThis.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        });
    });

    context('quando o email é incorreto', () => {

        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.form(globalThis.email_inv)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')

        });
    });

    context('quando a senha é muito curta', () => {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'abcd5']

        beforeEach(() => {
            signupPage.go()
        });

        passwords.forEach((p) => {
            it('não deve cadastrar com a senha: ' + p, () => {

                globalThis.short_password.password = p
                signupPage.form(globalThis.short_password)
                signupPage.submit()
            });
        })

        afterEach(() => {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        });
    });

    context('quando não preencho nenhum dos campos', () => {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signupPage.go()
            signupPage.submit()
        });

        alertMessages.forEach((alert) => {
            it('deve exibir ' + alert.toLowerCase(), () => {
                signupPage.alertHaveText(alert)
            });
        })
    });
});

