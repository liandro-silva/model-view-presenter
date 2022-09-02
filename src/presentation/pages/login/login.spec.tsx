import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from ".";
import { Validation } from "@/presentation/protocols/validation.protocol";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;
  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
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
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailInput = sut.getByTestId("email-status") as HTMLInputElement;
    expect(emailInput.title).toBe("Campo obrigatório");
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
    fireEvent.input(emailInput, { target: { value: "any_email" } });
    expect(validationSpy.input).toEqual({
      email: "any_email",
    });
  });

  it("should call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut();

    const password = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: "any_password" } });
    expect(validationSpy.input).toEqual({
      password: "any_password",
    });
  });
});
