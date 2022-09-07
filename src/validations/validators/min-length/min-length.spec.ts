import { InvalidFieldError } from "@/validations/errors";
import { MinLengthValidation } from ".";

const makeSut = () => new MinLengthValidation("field", 5);

describe("\n Validators - MinLenghtValidation\n", () => {
  it("should return error if value is invalid", () => {
    const sut = makeSut();
    const error = sut.validate("13");
    expect(error).toEqual(new InvalidFieldError());
  });
});
