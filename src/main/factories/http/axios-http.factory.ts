import { AxiostHttpClient } from "@/infra/http/axios-http-client/axios-http.client";

export const makeAxiosHttpClient = () => {
  return new AxiostHttpClient();
};
