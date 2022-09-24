export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  serverError = 500,
  badRequest = 400,
  notFound = 404,
  ok = 200,
  forbidden = 403,
  badGateway = 502,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
