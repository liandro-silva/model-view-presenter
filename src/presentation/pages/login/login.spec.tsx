import React from "react";
import { render, screen } from "@testing-library/react";
import Login from ".";

const makeSut = () => {
  const sut = () => render(<Login />);

  return {
    sut,
  };
};

describe("\n Page - Login \n", () => {
  it("should start with initial states", () => {
    const { sut } = makeSut();
    sut();

    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);

    const emailInput = screen.getByTestId("email-status") as HTMLInputElement;
    expect(emailInput.title).toBe("Campo obrigatório");
    expect(emailInput.textContent).toBe("🔴");

    const passwordInput = screen.getByTestId(
      "password-status"
    ) as HTMLInputElement;
    expect(passwordInput.title).toBe("Campo obrigatório");
    expect(passwordInput.textContent).toBe("🔴");
  });
});
