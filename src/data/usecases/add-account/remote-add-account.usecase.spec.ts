import { HttpStatusCode } from '@/data/protocols/http'

import { RemoteAddAccount } from './remote-add-account.usecase'
import { AddAccountParams } from '@/domain/usecases'

import { mockAddAccount } from '@/domain/mocks'
import { HttpPostClientSpy } from '@/data/mocks'

import { EmailInUseError } from '@/domain/errors'
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

  it('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccount()
    await sut.execute(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  it('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.execute(mockAddAccount())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
