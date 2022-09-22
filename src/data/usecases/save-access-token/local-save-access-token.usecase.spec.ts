import { LocalSaveAccessToken } from './local-save-access-token.usecase'
import { SetStorageSpy } from '@/data/mocks'

import { faker } from '@faker-js/faker'

describe('\n UseCase - Local Save Access Token\n', () => {
  it('should call SetStorage with correct value ', async () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.datatype.uuid()

    await sut.execute(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
