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
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
  });
});
