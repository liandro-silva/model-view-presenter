import { AccountModel } from '@/domain/models'

export type AddAccountParams = {
  passwordConfirmation: string
  password: string
  email: string
  name: string
}

export interface AddAccount {
  execute: (params: AddAccountParams) => Promise<AccountModel>
}
