import { mockAccountModel } from "@/domain/mocks";
import { AccountModel } from "@/domain/models";
import { Authentication, AuthenticationParams } from "@/domain/usecases";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;
  async execute(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
