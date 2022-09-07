import {
  ValidationBuilder,
  ValidationComposite
} from '@/validations/validators'
import { makeLoginValidations } from './validation.factory'

describe('\n Validators - LoginValidation \n', () => {
  it('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidations()
    expect(composite).toEqual(
      new ValidationComposite([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
