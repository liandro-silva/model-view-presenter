Cypress.Commands.add('getByTestId', (id) => {
  cy.get(`[data-testid=${id}]`)
}) 

Cypress.Commands.add('responseInterceptor', (method, path, params) => {
  cy.intercept(method, path, params)
})