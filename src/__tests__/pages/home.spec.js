import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Home } from "../../pages/home";

describe("Home page", () => {
  test("should be able to render an home", () => {
    render(<Home />);

    expect(screen.getByTestId("container-form")).toHaveTextContent(
      "Previsão de casos para os próximos dias"
    );
  });
});

describe("Search", () => {
  test("should be able to search", () => {
    render(<Home />);
    const textFild = screen.getByTestId("content-input");

    fireEvent.change(textFild, { target: { value: 12 } });

    expect(screen.getByTestId("content-input")).not.toHaveTextContent(13);
  });
});
