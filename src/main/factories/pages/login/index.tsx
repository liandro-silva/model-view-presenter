import React from "react";
import { makeValidations } from "./validation.factory";
import { Login } from "@/presentation/pages";

import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication";

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeValidations()}
    />
  );
};
