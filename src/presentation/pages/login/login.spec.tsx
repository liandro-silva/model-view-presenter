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
  it("should not initially render the children of form status", () => {
    const { sut } = makeSut();
    sut();
    const errorWrap = screen.getByTestId("error-wrap");

    expect(errorWrap.childElementCount).toBe(0);
  });
});
