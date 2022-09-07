import { InvalidFieldError } from '@/validations/errors'
import { MinLengthValidation } from '.'

type SutProps = {
  sut: MinLengthValidation
}

const makeSut = (): SutProps => {
  return {
    sut: new MinLengthValidation('field', 5)
  }
}

describe('\n Validators - MinLenghtValidation\n', () => {
  it('should return error if value is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate('13')
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if value is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate('123456')
    expect(error).toBeFalsy()
  })
})
