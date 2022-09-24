import { AddAccountParams, AuthenticationParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'

import { faker } from '@faker-js/faker'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    passwordConfirmation: password,
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password
  }
}

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
