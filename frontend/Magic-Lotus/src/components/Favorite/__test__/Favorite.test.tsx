import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Favorite from "../Favorite";
import { BLANK_ICARD } from "../../../models/scryfall/interfaces/ICard";

import * as hook from "../../../hooks/useAuth/useAuth";
import { BLANK_IUSER } from "../../../models/backend/interfaces/IUser";

// MORE TEST TO BE ADDED IN THE FUTURE. CURRENTLY SKIPPING TESTS REQUIRING MOCKING OF API CALLS.
// ADD MOCKS VIA "msw", READ MORE HERE
// https://testing-library.com/docs/react-testing-library/example-intro/#mock

describe("Favorite Component Tests", async () => {
  it("Should render", () => {
    // MOCK THE 'useAuth' CUSTOM HOOK TO MAKE '<Favorite>' COMPONENT RENDER
    vi.spyOn(hook, "default").mockImplementation(() => ({
      credentials: BLANK_IUSER,
      logout: () => {},
      login: () => {},
      refetch: () => {},
      isLoggedIn: true, // Needs to be true to be visible
      isLoading: false,
    }));

    render(<Favorite card={BLANK_ICARD} data-testid="FAVORITE_COMPONENT" />);
    const favorite = screen.queryByTestId("FAVORITE_COMPONENT");
    expect(favorite).toBeInTheDocument();
  });

  it("Should fail to render", () => {
    vi.spyOn(hook, "default").mockImplementation(() => ({
      credentials: BLANK_IUSER,
      logout: () => {},
      login: () => {},
      refetch: () => {},
      isLoggedIn: false,
      isLoading: false,
    }));

    render(<Favorite card={BLANK_ICARD} data-testid="FAVORITE_COMPONENT" />);
    const favorite = screen.queryByTestId("FAVORITE_COMPONENT");
    expect(favorite).not.toBeInTheDocument();
  });
});
