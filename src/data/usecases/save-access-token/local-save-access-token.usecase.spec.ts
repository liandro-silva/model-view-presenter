import { LocalSaveAccessToken } from './local-save-access-token.usecase'
import { SetStorageSpy } from '@/data/mocks'

import { faker } from '@faker-js/faker'

type SutProps = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutProps => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('\n UseCase - Local Save Access Token\n', () => {
  it('should call SetStorage with correct value ', async () => {
    const { sut, setStorageSpy } = makeSut()

    const accessToken = faker.datatype.uuid()
    await sut.execute(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
