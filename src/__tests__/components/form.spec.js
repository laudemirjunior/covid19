import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByText,
} from "@testing-library/react";
import { Form } from "../../components/form";

describe("Form component", () => {
  test("should be able to render an input", () => {
    render(<Form />);

    expect(
      screen.getAllByPlaceholderText("Digite a quantidade de dias...")
    ).toBeTruthy();
  });
});

describe("Input Component", () => {
  test("should be able to render an button", () => {
    render(<Form />);

    expect(screen.getByText("Calcular")).toBeTruthy();
  });
});

describe("Change input", () => {
  test("should be able to change input", () => {
    render(<Form />);
    const textFild = screen.getByPlaceholderText(
      "Digite a quantidade de dias..."
    );

    fireEvent.change(textFild, { target: { value: 12 } });

    expect(textFild).toHaveValue(12);
  });
});

describe("Search", () => {
  test("should be able to search", () => {
    render(<Form />);
    const textFild = screen.getByPlaceholderText(
      "Digite a quantidade de dias..."
    );

    const buttonElement = screen.getByText("Calcular");

    fireEvent.change(textFild, { target: { value: 12 } });
    fireEvent.click(buttonElement);

    expect(screen.getByText("Casos")).toBeInTheDocument();
  });
});
