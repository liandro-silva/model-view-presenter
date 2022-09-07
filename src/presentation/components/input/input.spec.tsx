import { render, screen } from "@testing-library/react";
import React from "react";
import Input from ".";
import Context from "@/presentation/contexts/form";
describe("\n Components - Input \n", () => {
  it("should begin with readonly", () => {
    render(
      <Context.Provider value={{ state: {} }}>
        <Input name="field" />
      </Context.Provider>
    );
    const inputElement = screen.getByTestId("field") as HTMLInputElement;
    expect(inputElement.readOnly).toBe(true);
  });
});
