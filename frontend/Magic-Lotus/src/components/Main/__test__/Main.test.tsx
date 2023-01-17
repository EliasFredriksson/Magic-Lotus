import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Main from "../Main";

import * as hook from "../../../hooks/useNavigate/useNavigate";

describe("Main Component Tests", async () => {
  it("Should render", () => {
    // MOCK THE 'useNavigate' CUSTOM HOOK TO MAKE '<Main>' COMPONENT RENDER
    vi.spyOn(hook, "default").mockImplementation(() => ({
      show: true,
      goToPage: () => {},
      setShow: (show) => {},
      navigate: (to) => {},
    }));

    render(
      <Main id="TEST_MAIN">
        <h1>TEST</h1>
      </Main>
    );
    const main = screen.queryByRole("main");
    expect(main).toBeInTheDocument();
  });

  it("Should not render render", () => {
    // MOCK THE 'useNavigate' CUSTOM HOOK TO MAKE '<Main>' COMPONENT RENDER
    vi.spyOn(hook, "default").mockImplementation(() => ({
      show: false,
      goToPage: () => {},
      setShow: (show) => {},
      navigate: (to) => {},
    }));

    render(
      <Main id="TEST_MAIN">
        <h1>TEST</h1>
      </Main>
    );
    const main = screen.queryByRole("main");
    expect(main).not.toBeInTheDocument();
  });
});
