import React from "react";
import { makeLoginValidations } from "./validation.factory";
import { Login } from "@/presentation/pages";

import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication";

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidations()}
    />
  );
};
