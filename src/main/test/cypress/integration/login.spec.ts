import { faker } from '@faker-js/faker';

const baseUrl: string = Cypress.config().baseUrl
describe('\n e2e - Login\n', () => {
  beforeEach(() => {
    cy.visit('/login');
  })
    it('should load with correct initial state', () => {
      cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
      cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório').should('contain.text', '🔴')
      cy.getByTestId('submit').should('have.attr', 'disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    });

    it('should present error state if form is invalid', () => {
      cy.getByTestId('email').focus().type(faker.random.words())
      cy.getByTestId('email-status').should('have.attr', 'title', 'Campo inválido').should('contain.text', '🔴')

      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
      cy.getByTestId('password-status').should('have.attr', 'title', 'Campo inválido').should('contain.text', '🔴')

      cy.getByTestId('submit').should('have.attr', 'disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    });

    it('should present valid state if form is valid', () => {
      cy.getByTestId('email').focus().type(faker.internet.email())
      cy.getByTestId('email-status').should('have.attr', 'title', '').should('contain.text', '🟢')

      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
      cy.getByTestId('password-status').should('have.attr', 'title', '').should('contain.text', '🟢')

      cy.getByTestId('submit').should('not.have.attr', 'disabled')
      cy.getByTestId('error-wrap').should('not.have.descendants')
    }); 

    it('should present error if invalid credentials are provided', () => {
      cy.responseInterceptor('POST', 'login', {
        statusCode: 401,
        body: {
          error: faker.random.words()
        }
      })
      cy.getByTestId('email').focus().type(faker.internet.email())
      cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

      cy.getByTestId('submit').click()
      cy.getByTestId('loading').should('not.exist')
      cy.getByTestId('main-error').should('exist')
      
      cy.url().should('eq', `${baseUrl}/login`)
    }); 

    it('should save accessToken if valid credentials are provided', () => {
      cy.responseInterceptor('POST', 'login', {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid()
        }
      })
      cy.getByTestId('email').focus().type('mango@gmail.com')
      cy.getByTestId('password').focus().type('12345')

      cy.getByTestId('submit').click()
      cy.getByTestId('loading').should('not.exist')
      
      cy.url().should('eq', `${baseUrl}/`)
      cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    }); 
}); 