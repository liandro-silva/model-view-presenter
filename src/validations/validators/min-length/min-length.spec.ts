import { InvalidFieldError } from '@/validations/errors'
import { faker } from '@faker-js/faker'
import { MinLengthValidation } from '.'

type SutProps = {
  sut: MinLengthValidation
}

const makeSut = (field: string): SutProps => {
  return {
    sut: new MinLengthValidation(field, 5)
  }
}

describe('\n Validators - MinLenghtValidation\n', () => {
  it('should return error if value is invalid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '123' })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '12345' })
    expect(error).toBeFalsy()
  })

  it('should return falsy if field does not exist in schema', () => {
    const { sut } = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: '12345' })
    expect(error).toBeFalsy()
  })
})
