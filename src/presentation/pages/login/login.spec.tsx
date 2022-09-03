import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from ".";
import { ValidationSpy } from "@/presentation/mocks";
import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.lorem.words();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy,
  };
};

describe("\n Page - Login \n", () => {
  afterEach(() => {
    cleanup();
  });

  it("should start with initial states", () => {
    const { sut, validationSpy } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailInput = sut.getByTestId("email-status") as HTMLInputElement;
    expect(emailInput.title).toBe(validationSpy.errorMessage);
    expect(emailInput.textContent).toBe("🔴");

    const passwordInput = sut.getByTestId(
      "password-status"
    ) as HTMLInputElement;
    expect(passwordInput.title).toBe("Campo obrigatório");
    expect(passwordInput.textContent).toBe("🔴");
  });

  it("should call Validation with correct email", () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    const emailValue = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: emailValue } });
    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(emailValue);
  });

  it("should call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut();

    const password = sut.getByTestId("password") as HTMLInputElement;
    const passwordValue = faker.internet.password();
    fireEvent.input(password, { target: { value: passwordValue } });
    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(passwordValue);
  });

  it("should show email error if Validation fails", () => {
    const { sut, validationSpy } = makeSut();

    const email = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });
});
