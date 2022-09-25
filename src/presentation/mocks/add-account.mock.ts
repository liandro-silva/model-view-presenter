import { mockAccountModel } from '@/domain/mocks'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  async execute (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return this.account
  }
}
