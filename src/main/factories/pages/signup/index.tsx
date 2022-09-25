import { Signup } from '@/presentation/pages'
import React from 'react'
import { makeRemoteAddAccount } from '../../usecases/add-account'
import { makeSignupValidations } from './validation.factory'

export const makeSignup: React.FC = () => {
  return <Signup addAccount={makeRemoteAddAccount()} validation={makeSignupValidations()} saveAccessToken={} />
}
