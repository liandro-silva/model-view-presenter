import { EmailValidation } from '.'

import { InvalidFieldError } from '@/validations/errors'
import { faker } from '@faker-js/faker'

type SutProps = {
  sut: EmailValidation
}

const makeSut = (field: string): SutProps => {
  const sut = new EmailValidation(field)
  return {
    sut
  }
}

describe('\n Validators - Email Validation \n', () => {
  it('should return error if email is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if email is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })
})
