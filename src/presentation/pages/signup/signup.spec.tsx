import React from 'react'
import {
  render,
  RenderResult,
  cleanup
} from '@testing-library/react'
import { Signup } from '@/presentation/pages'

import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import * as Helper from '@/presentation/test/helpers'

type SutTypes = {
  sut: RenderResult

}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <Signup/>
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
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
