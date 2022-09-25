import { FieldValidation } from '@/validations/protocols'
import { InvalidFieldError } from '@/validations/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly fieldToCompare: string) {}
  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
