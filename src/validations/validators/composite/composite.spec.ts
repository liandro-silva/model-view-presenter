import { FieldValidationSpy } from "@/validations/mocks";
import { faker } from "@faker-js/faker";
import { ValidationComposite } from ".";

type SutProps = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutProps => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return {
    sut,
    fieldValidationsSpy,
  };
};

describe("\n Validators - ValidationComposite \n", () => {
  it("should return error if any validation fails", () => {
    const { sut, fieldValidationsSpy } = makeSut("any_field");
    const errorMessage = faker.lorem.words();

    fieldValidationsSpy[0].error = new Error(errorMessage);
    fieldValidationsSpy[1].error = new Error(faker.lorem.words());

    const error = sut.validate("any_field", faker.lorem.word());
    expect(error).toBe(error);
  });
  it("should return falsy if there is no error", () => {
    const { sut } = makeSut("any_field");

    const error = sut.validate("any_field", faker.lorem.word());
    expect(error).toBeFalsy();
  });
});
