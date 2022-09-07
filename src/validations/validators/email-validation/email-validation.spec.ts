import { EmailValidation } from ".";

import { InvalidFieldError } from "@/validations/errors";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const sut = new EmailValidation("email");
  return {
    sut,
  };
};

describe("\n Validators - Email Validation \n", () => {
  it("should return error if email is invalid", () => {
    const { sut } = makeSut();
    const error = sut.validate(faker.lorem.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  it("should return falsy if email is valid", () => {
    const { sut } = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
