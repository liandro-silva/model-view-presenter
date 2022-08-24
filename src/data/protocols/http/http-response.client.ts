export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
  serverError = 500,
  badRequest = 400,
  notFound = 404,
  ok = 200,
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: any;
};
