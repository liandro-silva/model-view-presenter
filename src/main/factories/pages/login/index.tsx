import React from 'react'
import { makeLoginValidations } from './validation.factory'
import { Login } from '@/presentation/pages'

import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidations()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
