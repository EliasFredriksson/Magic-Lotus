import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import { BLANK_ICARD } from "../../../models/scryfall/interfaces/ICard";
import MagicCard from "../MagicCard";

describe("MagicCard Component Tests", async () => {
  it("Should render", () => {
    render(
      <MagicCard
        card={BLANK_ICARD}
        size="normal"
        quality="normal"
        role="magic_card"
      />
    );
    const card = screen.getByRole("magic_card");
    expect(card).toBeInTheDocument();
  });

  it("Should not trigger 'onClick' when 'disabled¨'", async () => {
    let success = true;
    render(
      <MagicCard
        card={BLANK_ICARD}
        size="normal"
        quality="normal"
        role="magic_card"
        disabled
        onClick={() => {
          success = false;
        }}
      />
    );
    const card = screen.getByRole("magic_card");

    fireEvent.click(card);

    expect(success).toBe(true);
  });
});
