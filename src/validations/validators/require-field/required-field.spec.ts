import { RequiredFieldValidation } from '@/validations/validators'
import { RequiredFieldError } from '@/validations/errors'
import { faker } from '@faker-js/faker'
type SutProps = {
  sut: RequiredFieldValidation
}

const makeSut = (field: string): SutProps => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('\n Validators - Required Field \n', () => {
  it('should return error if field is empy', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empy', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.words() })
    expect(error).toBeFalsy()
  })
})
