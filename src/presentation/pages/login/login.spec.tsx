import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from ".";
import { ValidationStub } from "@/presentation/mocks";
import { faker } from "@faker-js/faker";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
  };
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

    const emailInput = sut.getByTestId("email-status") as HTMLInputElement;
    expect(emailInput.title).toBe(validationError);
    expect(emailInput.textContent).toBe("🔴");

    const passwordInput = sut.getByTestId(
      "password-status"
    ) as HTMLInputElement;
    expect(passwordInput.title).toBe(validationError);
    expect(passwordInput.textContent).toBe("🔴");
  });

  it("should show email error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    const email = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });

  it("should show password error if Validation fails", () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    const password = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  it("should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();

    const email = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: faker.internet.email() } });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("");
    expect(emailStatus.textContent).toBe("🟢");
  });

  it("should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();

    const password = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: faker.internet.password() } });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  it("should enable submit button is form is valid", () => {
    const { sut } = makeSut();

    const email = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(email, { target: { value: faker.internet.email() } });

    const password = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(password, { target: { value: faker.internet.password() } });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });
});
