import { EmailValidation } from ".";

import { InvalidFieldError } from "@/validations/errors";

const makeSut = () => {
  const sut = new EmailValidation("email");
  return {
    sut,
  };
};

describe("\n Validators - Email Validation \n", () => {
  it("should return error if email is invalid", () => {
    const { sut } = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new InvalidFieldError());
  });
});
