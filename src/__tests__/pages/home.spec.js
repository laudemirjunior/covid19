import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "../../pages/home";

describe("Home page", () => {
  test("should be able to render an home", () => {
    render(<Home />);

    expect(screen.getByTestId("container-form")).toHaveTextContent(
      "Previsão de casos de COVID-19 para os próximos dias"
    );
  });
});
