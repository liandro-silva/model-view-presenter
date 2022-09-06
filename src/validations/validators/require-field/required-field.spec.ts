import { RequiredFieldValidation } from "@/validations/validators";
import { RequiredFieldError } from "@/validations/errors";
import { faker } from "@faker-js/faker";

const makeSut = () => {
  const sut = new RequiredFieldValidation(faker.database.column());
  return {
    sut,
  };
};

describe("\n Validators - Required Field \n", () => {
  it("should return error if field is empy", () => {
    const { sut } = makeSut();
    const error = sut.validate("");
    expect(error).toEqual(new RequiredFieldError());
  });

  it("should return falsy if field is not empy", () => {
    const { sut } = makeSut();
    const error = sut.validate(faker.lorem.words());
    expect(error).toBeFalsy();
  });
});
