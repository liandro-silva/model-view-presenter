import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { Login } from "@/presentation/pages";

import { faker } from "@faker-js/faker";

import { ValidationStub, AuthenticationSpy } from "@/presentation/mocks";
import { mockAuthentication } from "@/domain/mocks";
import { InvalidCredentialsError } from "@/domain/errors";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/login"] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  );

  return {
    sut,
    authenticationSpy,
  };
};

const populateEmailField = (sut: RenderResult, email: string = ""): void => {
  const emailInput = sut.getByTestId("email") as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });
};

const populatePasswordField = (
  sut: RenderResult,
  password: string = ""
): void => {
  const passwordInput = sut.getByTestId("password") as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);

  expect(emailStatus.title).toBe(validationError || "");
  expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
};

const errorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId("error-wrap");
  expect(errorWrap.childElementCount).toBe(count);
};

const testElementExist = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const el = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(el.disabled).toBe(isDisabled);
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email: string = "",
  password: string = ""
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);

  await waitFor(() => {
    const form = sut.getByTestId("form");
    fireEvent.submit(form);
  });
};

describe("\n Page - Login \n", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    localStorage.clear();
  });

  it("should start with initial states", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    errorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, "submit", true);
    testStatusForField(sut, "email", validationError);
    testStatusForField(sut, "password", validationError);
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const { email } = mockAuthentication();

    populateEmailField(sut, email);
    testStatusForField(sut, "email", validationError);
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    const { password } = mockAuthentication();

    populatePasswordField(sut, password);
    testStatusForField(sut, "password", validationError);
  });

  it("should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();
    const { email } = mockAuthentication();

    populateEmailField(sut, email);
    testStatusForField(sut, "email");
  });

  it("should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();
    const { password } = mockAuthentication();

    populatePasswordField(sut, password);
    testStatusForField(sut, "password");
  });

  it("should enable submit button is form is valid", () => {
    const { sut } = makeSut();
    const { email, password } = mockAuthentication();

    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    testButtonIsDisabled(sut, "submit", false);
  });

  it("should show loading indicator on submit", async () => {
    const { sut } = makeSut();

    await simulateValidSubmit(sut);

    testElementExist(sut, "loading");
  });

  it("should call Authentication with correct values", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { email, password } = mockAuthentication();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it("should call Authentication only once", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { email, password } = mockAuthentication();

    await simulateValidSubmit(sut, email, password);
    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it("should not call Authentication if form is invalid", async () => {
    const validationError = faker.lorem.words();
    const { sut, authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("should present error if Authentication fails", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { email, password } = mockAuthentication();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "execute").mockRejectedValueOnce(error);

    await simulateValidSubmit(sut, email, password);
    await waitFor(async () => {
      testElementText(sut, "main-error", error.message);
    });
    errorWrapChildCount(sut, 1);
  });

  it("should add accessToken to localstorage on success", async () => {
    const { sut, authenticationSpy } = makeSut();
    const { email, password } = mockAuthentication();

    await waitFor(() => {
      simulateValidSubmit(sut, email, password);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        "accessToken",
        authenticationSpy.account.accessToken
      );
      expect(history.length).toBe(1);
      expect(history.location.pathname).toBe("/");
    });
  });

  it("should go to signup page", () => {
    const { sut } = makeSut();

    const registerLink = sut.getByTestId("register");
    fireEvent.click(registerLink);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
