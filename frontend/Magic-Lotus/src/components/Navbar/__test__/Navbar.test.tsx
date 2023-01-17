import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
// HOOKS
import * as useNavigate from "../../../hooks/useNavigate/useNavigate";
import * as useAuth from "../../../hooks/useAuth/useAuth";
import * as useScreenSize from "../../../hooks/useScreenSize/useScreenSize";
import * as useBoolean from "../../../hooks/useBoolean/useBoolean";
import * as useSearch from "../../../hooks/useSearch/useSearch";
// CONSTANTS
import { BLANK_IUSER } from "../../../models/backend/interfaces/IUser";
// COMPONENT
import Navbar from "../Navbar";
import { BLANK_PAGINATED_CARDS } from "../../../models/scryfall/types/Paginated";

// !!! MORE TESTS NEED TO BE ADDED HERE. NEED TO GATHER MORE KNOWLEDGE HOW TO !!!
// !!! SET UP GLOBAL MOCKS TO USE !!!

describe("Navbar Component Tests", async () => {
  it("Should render", () => {
    render(<Navbar />);
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });

  it("Should render", () => {
    // MOCK THE 'useNavigate' CUSTOM HOOK TO MAKE '<Main>' COMPONENT RENDER
    vi.spyOn(useNavigate, "default").mockImplementation(() => ({
      show: true,
      goToPage: () => {},
      setShow: (show) => {},
      navigate: (to) => {},
    }));

    // MOCK 'useAuth'
    vi.spyOn(useAuth, "default").mockImplementation(() => ({
      credentials: BLANK_IUSER,
      logout: () => {},
      login: () => {},
      refetch: () => {},
      isLoggedIn: false,
      isLoading: false,
    }));

    // MOCK 'useScreenSize'
    vi.spyOn(useScreenSize, "default").mockImplementation(() => ({
      size: {
        width: 100,
        height: 100,
      },
      breakpoints: {
        IS_MOBILE: false,
        IS_TABLET: false,
        IS_LAPTOP: false,
        IS_DESKTOP: false,
      },
    }));

    // MOCK 'useBoolean'
    let bool = true;
    vi.spyOn(useBoolean, "default").mockImplementation(() => ({
      value: bool,
      on: () => {
        bool = true;
      },
      off: () => {
        bool = false;
      },
      toggle: () => {
        bool = !bool;
      },
    }));

    // MOCK 'useSearch'
    vi.spyOn(useSearch, "default").mockImplementation(() => ({
      latestSearch: BLANK_PAGINATED_CARDS,
      search: async (params, raw) => {},
      isLoading: false,
    }));

    render(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
  });
});
