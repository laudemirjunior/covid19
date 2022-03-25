import React from "react";
import { render, screen } from "@testing-library/react";
import { Form } from "../../components/form";

describe("Form component", () => {
  test("should be able to render an form", () => {
    render(<Form />);

    expect(
      screen.getAllByPlaceholderText("Digite a quantidade de dias...")
    ).toBeTruthy();
  });
});

describe("Input Component", () => {
  test("should be able to render an input", () => {
    render(<Form />);
    const buttonElement = screen.getByText("Calcular");

    expect(buttonElement).toBeTruthy();
  });
});
