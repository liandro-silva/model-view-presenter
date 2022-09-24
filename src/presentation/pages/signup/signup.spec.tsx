import React from 'react'
import {
  render,
  RenderResult,
  cleanup
} from '@testing-library/react'
import { Signup } from '@/presentation/pages'

import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

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

const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(el.disabled).toBe(isDisabled)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError || '')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('\n Page - Signup \n', () => {
  afterEach(() => {
    cleanup()
  })

  it('should start with initial states', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
