import { fireEvent, RenderResult, waitFor } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(el.disabled).toBe(isDisabled)
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError || '')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateEmailField = (sut: RenderResult, email: string = ''): void => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  fireEvent.input(emailInput, { target: { value: email } })
}

export const populatePasswordField = (
  sut: RenderResult,
  password: string = ''
): void => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  fireEvent.input(passwordInput, { target: { value: password } })
}

export const testElementExist = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

export const testInputIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = sut.getByTestId(fieldName) as HTMLInputElement
  expect(el.disabled).toBe(isDisabled)
}

export const simulateValidSubmit = async (
  sut: RenderResult,
  email: string = '',
  password: string = ''
): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  await waitFor(() => {
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
  })
}
