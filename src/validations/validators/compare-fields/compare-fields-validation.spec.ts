import { CompareFieldsValidation } from '@/validations/validators'
import { InvalidFieldError } from '@/validations/errors'
import { faker } from '@faker-js/faker'
type SutProps = {
  sut: CompareFieldsValidation
}

const makeSut = (valueToCompare: string): SutProps => {
  const sut = new CompareFieldsValidation(faker.database.column(), valueToCompare)
  return {
    sut
  }
}

describe('\n Validators - Compare Fields Validation \n', () => {
  it('should return error if compare is invalid', () => {
    const { sut } = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
