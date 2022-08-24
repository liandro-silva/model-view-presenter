import { HttpResponse } from "./http-response.client";

export type HttpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>;
}
