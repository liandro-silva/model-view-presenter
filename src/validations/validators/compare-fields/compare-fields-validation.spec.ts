import { CompareFieldsValidation } from '@/validations/validators'
import { InvalidFieldError } from '@/validations/errors'
import { faker } from '@faker-js/faker'
type SutProps = {
  sut: CompareFieldsValidation
}

const makeSut = (field: string, fieldToCompare: string): SutProps => {
  const sut = new CompareFieldsValidation(field, fieldToCompare)
  return {
    sut
  }
}

describe('\n Validators - Compare Fields Validation \n', () => {
  it('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const { sut } = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const { sut } = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
