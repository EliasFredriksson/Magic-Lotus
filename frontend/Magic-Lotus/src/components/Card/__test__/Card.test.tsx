import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Card from "../Card";

describe("Card Component Tests", () => {
  it("Should render", () => {
    render(<Card>TEST_CARD</Card>);
    const card = screen.getByText("TEST_CARD");
    expect(card).toBeInTheDocument();
  });

  it("Should have specified attributes", () => {
    render(<Card className="test-class">TEST_CARD</Card>);
    const card = screen.getByText("TEST_CARD");
    expect(card).toHaveAttribute("class", "card-component test-class");
  });

  it("Should contain children", () => {
    render(
      <Card data-testid="TEST_CARD">
        <h1>TITLE</h1>
        <p>TEXT</p>
      </Card>
    );
    const card = screen.getByTestId("TEST_CARD");
    expect(card.children).toHaveLength(2);
    expect(card.children[0]).toHaveTextContent("TITLE");
    expect(card.children[1]).toHaveTextContent("TEXT");
  });
});
