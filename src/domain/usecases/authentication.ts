import { AccountModel } from "domain/models/account.model";

type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  execute: (params: AuthenticationParams) => Promise<AccountModel>;
}
