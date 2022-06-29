
describe('Suite de testes', () => {

    before(() => {
        cy.log('aqui temos algo que roda antes de TODOS os testes')
    });

    beforeEach(() => {
        cy.log('aqui temos algo que roda antes de CADA os testes')
    });

    it('teste 1', () => {
        cy.log('testando o teste 1')
    });
    
    it('teste 2', () => {
        cy.log('testando o teste 2')
    });
    
    it('teste 3', () => {
        cy.log('testando o teste 3')
    });

    after(() => {
        cy.log('aqui temos algo que roda antes de DEPOIS os testes')
    });

    afterEach(() => {
        cy.log('aqui temos algo que roda depois de CADA os testes')
    });
});

