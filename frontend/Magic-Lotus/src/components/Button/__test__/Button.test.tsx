import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Button from "../Button";

describe("Button Component Tests", () => {
  it("Should render", () => {
    render(<Button>TEST_BUTTON</Button>);
    const button = screen.getByText("TEST_BUTTON");
    expect(button).toBeInTheDocument();
  });

  it("Should change value on click", () => {
    let value = false;
    function onClick() {
      value = true;
    }

    render(<Button onClick={onClick}>TEST_BUTTON</Button>);
    const button = screen.getByText("TEST_BUTTON");
    fireEvent.click(button);
    expect(value).toBe(true);
  });

  it("Should have specified attributes", () => {
    render(
      <Button type="submit" disabled>
        TEST_BUTTON
      </Button>
    );
    const button = screen.getByText("TEST_BUTTON");

    expect(button).toHaveAttribute("type", "submit");
    expect(button).toHaveAttribute("disabled", "");
  });
});
