import React from 'react'
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor
} from '@testing-library/react'
import { Login } from '@/presentation/pages'

import { faker } from '@faker-js/faker'

import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock } from '@/presentation/mocks'
import { mockAuthentication } from '@/domain/mocks'
import { InvalidCredentialsError } from '@/domain/errors'

import * as Helper from '@/presentation/test/helpers'

import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('\n Page - Login \n', () => {
  afterEach(() => {
    cleanup()
  })

  it('should start with initial states', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show email error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })
    const { email } = mockAuthentication()

    Helper.populateEmailField(sut, email)
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })
    const { password } = mockAuthentication()

    Helper.populatePasswordField(sut, password)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { email } = mockAuthentication()

    Helper.populateEmailField(sut, email)
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const { password } = mockAuthentication()

    Helper.populatePasswordField(sut, password)
    Helper.testStatusForField(sut, 'password')
  })

  it('should enable submit button is form is valid', () => {
    const { sut } = makeSut()
    const { email, password } = mockAuthentication()

    Helper.populateEmailField(sut, email)
    Helper.populatePasswordField(sut, password)
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('should show loading indicator on submit', async () => {
    const { sut } = makeSut()

    await Helper.simulateValidSubmit(sut)

    Helper.testElementExist(sut, 'loading')
  })

  it('should disable fields on submit', async () => {
    const { sut } = makeSut()

    await Helper.simulateValidSubmit(sut)

    Helper.testInputIsDisabled(sut, 'email', true)
    Helper.testInputIsDisabled(sut, 'password', true)
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { email, password } = mockAuthentication()

    await Helper.simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { email, password } = mockAuthentication()

    await Helper.simulateValidSubmit(sut, email, password)
    await Helper.simulateValidSubmit(sut, email, password)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    await Helper.simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const { email, password } = mockAuthentication()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'execute').mockRejectedValueOnce(error)

    await Helper.simulateValidSubmit(sut, email, password)
    await waitFor(async () => {
      Helper.testElementText(sut, 'main-error', error.message)
    })
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    const { email, password } = mockAuthentication()

    await waitFor(() => {
      Helper.simulateValidSubmit(sut, email, password)
      expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
      expect(history.length).toBe(1)
      expect(history.location.pathname).toBe('/')
    })
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()

    const registerLink = sut.getByTestId('register')
    fireEvent.click(registerLink)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
