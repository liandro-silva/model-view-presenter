import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from ".";

import { faker } from "@faker-js/faker";

import { ValidationStub, AuthenticationSpy } from "@/presentation/mocks";
import { mockAuthentication } from "@/domain/mocks";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    sut,
    authenticationSpy,
  };
};

const populateEmailField = (sut: RenderResult, email: string = "") => {
  const emailInput = sut.getByTestId("email") as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (sut: RenderResult, password: string = "") => {
  const passwordInput = sut.getByTestId("password") as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
};

const simulateStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
) => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);

  expect(emailStatus.title).toBe(validationError || "");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

const simulateValidSubmit = (
  sut: RenderResult,
  email: string = "",
  password: string = ""
) => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
  fireEvent.click(submitButton);
};

describe("\n Page - Login \n", () => {
  afterEach(() => {
    cleanup();
  });

  it("should start with initial states", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    simulateStatusForField(sut, "email", validationError);
    simulateStatusForField(sut, "password", validationError);
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const { email } = mockAuthentication();

    populateEmailField(sut, email);
    simulateStatusForField(sut, "email", validationError);
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const { password } = mockAuthentication();

    populatePasswordField(sut, password);
    simulateStatusForField(sut, "password", validationError);
  });

  it("should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    const { email } = mockAuthentication();

    populateEmailField(sut, email);
    simulateStatusForField(sut, "email");
  });

  it("should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    const { password } = mockAuthentication();

    populatePasswordField(sut, password);
    simulateStatusForField(sut, "password");
  });

  it("should enable submit button is form is valid", () => {
    const { sut } = makeSut();
    const { email, password } = mockAuthentication();

    populateEmailField(sut, email);
    populatePasswordField(sut, password);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it("should show loading indicator on submit", () => {
    const { sut } = makeSut();

    simulateValidSubmit(sut);

    const loadingIndicator = sut.getByTestId("loading");
    expect(loadingIndicator).toBeTruthy();
  });

  it("should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const { email, password } = mockAuthentication();

    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
