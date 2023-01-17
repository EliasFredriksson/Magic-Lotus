import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Spinner from "../Spinner";

describe("Spinner Component Tests", async () => {
  it("Should render", () => {
    render(
      <Spinner variant="pulse" size="medium" data-testid="TEST_SPINNER" />
    );
    const spinner = screen.getByTestId("TEST_SPINNER");
    expect(spinner).toBeInTheDocument();
  });
});
