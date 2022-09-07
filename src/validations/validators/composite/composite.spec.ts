import { FieldValidationSpy } from "@/validations/validators/mocks";
import { ValidationComposite } from ".";

type SutProps = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutProps => {
  const fieldValidationsSpy = [
    new FieldValidationSpy("any_field"),
    new FieldValidationSpy("any_field"),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("\n Validators - ValidationComposite \n", () => {
  it("should return error if any validation fails", () => {
    const { sut, fieldValidationsSpy } = makeSut();

    fieldValidationsSpy[0].error = new Error("first_error");
    fieldValidationsSpy[1].error = new Error("first_error");

    const error = sut.validate("any_field", "any_value");
    expect(error).toBe("first_error");
  });
});
