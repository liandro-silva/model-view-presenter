import React from "react";
import { Login } from "@/presentation/pages";
import { RemoteAuthentication } from "@/data/usecases/authencation/remote-authentication.usecase";
import { AxiostHttpClient } from "@/infra/http/axios-http-client/axios-http.client";
import { ValidationComposite } from "@/validations/validators";
import { ValidationBuilder } from "@/validations/validators/builder";

export const makeLogin: React.FC = () => {
  const url = "http://fordevs.herokuapp.com/api/login";
  const axiosHttpClient = new AxiostHttpClient();
  const makeRemoteAuthentication = new RemoteAuthentication(
    url,
    axiosHttpClient
  );
  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);
  return (
    <Login
      authentication={makeRemoteAuthentication}
      validation={validationComposite}
    />
  );
};
