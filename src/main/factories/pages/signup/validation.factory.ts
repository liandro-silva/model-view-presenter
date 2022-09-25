import {
  ValidationBuilder,
  ValidationComposite
} from '@/validations/validators'

export const makeSignupValidations = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field('name').required().min(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().sameAs('password').build()
  ])
}
