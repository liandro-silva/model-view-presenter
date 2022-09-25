import { Validation } from '../protocols/validation.protocol'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}
