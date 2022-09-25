import { CompareFieldsValidation } from './../compare-fields/index'
import {
  RequiredFieldValidation,
  MinLengthValidation,
  EmailValidation
} from '@/validations/validators'
import { ValidationBuilder as sut } from '.'
import { faker } from '@faker-js/faker'

describe('\n Validators - ValidationBuilder \n', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations.length).toBe(1)
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  it('should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()

    expect(validations.length).toBe(1)
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  it('should return MinLengthValidation', () => {
    const validations = sut.field('any_field').min(5).build()

    expect(validations.length).toBe(1)
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })

  it('should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = sut.field(field).sameAs(fieldToCompare).build()

    expect(validations.length).toBe(1)
    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('should return a list of validations', () => {
    const validations = sut
      .field('any_field')
      .required()
      .min(5)
      .email()
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidation('any_field'),
      new MinLengthValidation('any_field', 5),
      new EmailValidation('any_field')
    ])
  })
})
