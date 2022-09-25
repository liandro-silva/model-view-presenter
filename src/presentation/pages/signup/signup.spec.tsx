import React from 'react'
import {
  render,
  RenderResult,
  cleanup
} from '@testing-library/react'
import { Signup } from '@/presentation/pages'

import { faker } from '@faker-js/faker'

import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import { ValidationStub } from '@/presentation/mocks'

import * as Helper from '@/presentation/test/helpers'
import { mockAddAccount } from '@/domain/mocks'

type SutTypes = {
  sut: RenderResult

}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Signup validation={validationStub}/>
    </Router>
  )

  return {
    sut
  }
}

describe('\n Page - Signup \n', () => {
  afterEach(() => {
    cleanup()
  })

  it('should show name error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })
    const { email } = mockAddAccount()

    Helper.populateField(sut, 'email', email)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })
    const { password } = mockAddAccount()

    Helper.populateField(sut, 'password', password)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })
    const { passwordConfirmation } = mockAddAccount()

    Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('should show valid name state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should show valid passwordConfirmation state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should enable submit button is form is valid', () => {
    const { sut } = makeSut()
    const { email, password, name, passwordConfirmation } = mockAddAccount()

    Helper.populateField(sut, 'email', email)
    Helper.populateField(sut, 'name', name)
    Helper.populateField(sut, 'password', password)
    Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })
})
