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

  it('should start with initial states', () => {
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email')
    Helper.testStatusForField(sut, 'name')
    Helper.testStatusForField(sut, 'password')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should show name error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
