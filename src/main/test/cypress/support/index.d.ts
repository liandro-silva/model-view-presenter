type ResponseInterceptorProps = {
  statusCode: number
  body: any
}

declare namespace Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
    responseInterceptor: (method: 'POST' | 'GET' | 'PUT' | 'DELETE', path: string, params: ResponseInterceptorProps) => Chainable<Element>
  }
}
