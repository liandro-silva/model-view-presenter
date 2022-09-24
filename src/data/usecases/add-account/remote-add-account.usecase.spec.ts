// import { HttpStatusCode } from '@/data/protocols/http'

import { RemoteAddAccount } from './remote-add-account.usecase'
import { AddAccountParams } from '@/domain/usecases'

import { mockAddAccount } from '@/domain/mocks'
import { HttpPostClientSpy } from '@/data/mocks'

// import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { faker } from '@faker-js/faker'

type SutProps = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutProps => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AddAccountParams,
  AccountModel
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('\n UseCase - Remote Authentication \n', () => {
  it('should call HttpPostClient with correct url', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.execute(mockAddAccount())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
