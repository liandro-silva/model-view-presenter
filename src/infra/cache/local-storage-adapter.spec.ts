
import { cleanup } from '@testing-library/react'
import 'jest-localstorage-mock'

import { LocalStorageAdapter } from './local-storage-adapter'

import { faker } from '@faker-js/faker'

type SutProps = {
  sut: LocalStorageAdapter
}

const makeSut = (): SutProps => {
  const sut = new LocalStorageAdapter()
  return { sut }
}

describe('\n Local Storage - LocalStorageAdapter\n', () => {
  afterEach(() => {
    cleanup()
  })
  beforeEach(() => {
    localStorage.clear()
  })
  it('should call localStorage with correct value', async () => {
    const { sut } = makeSut()

    const key = faker.datatype.string()
    const value = faker.datatype.uuid()

    await sut.set(key, value)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      key,
      value
    )
  })
})
