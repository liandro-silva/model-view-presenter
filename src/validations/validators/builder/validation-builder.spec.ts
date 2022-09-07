import { RequiredFieldValidation } from "@/validations/validators";
import { ValidationBuilder as sut } from ".";

describe("\n Validators - ValidationBuilder \n", () => {
  it("should return RequiredFieldValidation", () => {
    const validations = sut.field("any_field").required().build();

    expect(validations.length).toBe(1);
    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });
});
