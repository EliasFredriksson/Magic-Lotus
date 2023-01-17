import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Text from "../Text";

describe("Text Component Tests", async () => {
  it("Should render", () => {
    render(<Text data-testid="TEST_TEXT" />);
    const text = screen.getByTestId("TEST_TEXT");
    expect(text).toBeInTheDocument();
  });
});
