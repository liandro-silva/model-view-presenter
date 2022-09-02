import React from "react";
import { render, RenderResult } from "@testing-library/react";
import Login from ".";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<Login />);

  return {
    sut,
  };
};

describe("\n Page - Login \n", () => {
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
});
