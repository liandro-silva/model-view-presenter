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
  const el = sut.getByTestId(`${fieldName}-status`)

  expect(el.title).toBe(validationError || '')
  expect(el.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (sut: RenderResult, fieldName: string ,value: string = ''): void => {
  const el = sut.getByTestId(fieldName) as HTMLInputElement
  fireEvent.input(el, { target: { value } })
}

export const testElementExist = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

export const testElementText = async (
  sut: RenderResult,
  fieldName: string,
  text: string
): Promise<void> => {
  const el = await sut.findByTestId(fieldName)
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
  populateField(sut, 'email', email)
  populateField(sut, 'password', password)

  await waitFor(() => {
    const form = sut.getByTestId('form')
    fireEvent.submit(form)
  })
}
