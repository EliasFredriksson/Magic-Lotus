import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Favorite from "../Favorite";
import { BLANK_ICARD } from "../../../models/scryfall/interfaces/ICard";

// MORE TEST TO BE ADDED IN THE FUTURE. CURRENTLY SKIPPING TESTS REQUIRING MOCKING OF API CALLS.
// ADD MOCKS VIA "msw", READ MORE HERE
// https://testing-library.com/docs/react-testing-library/example-intro/#mock

describe("Favorite Component Tests", async () => {
  it("Should fail to render", () => {
    render(<Favorite card={BLANK_ICARD} />);
    const favorite = screen.queryByTitle("favorite-component");
    expect(favorite).not.toBeInTheDocument();
  });
});
