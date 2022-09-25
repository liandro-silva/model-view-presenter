import { FieldValidation } from '@/validations/protocols'
import { RequiredFieldError } from '@/validations/errors'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}
  validate (input: object): Error {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
