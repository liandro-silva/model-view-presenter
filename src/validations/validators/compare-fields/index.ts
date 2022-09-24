import { FieldValidation } from '@/validations/protocols'
import { InvalidFieldError } from '@/validations/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (readonly field: string, private readonly valueToCompare: string) {}
  validate (value: string): Error {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }
}
