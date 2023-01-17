import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

import { Seperator } from "../Seperator";

describe("Seperator Component Tests", async () => {
  it("Should render", () => {
    render(<Seperator direction="ver" data-testid="TEST_SEPERATOR" />);
    const hr = screen.getByTestId("TEST_SEPERATOR");
    expect(hr).toBeInTheDocument();
  });

  it("Should render (VERTICALLY) ", () => {
    render(<Seperator direction="ver" data-testid="TEST_SEPERATOR" />);
    const hr = screen.getByTestId("TEST_SEPERATOR");

    expect(hr).toHaveStyle("width: 100%");
    expect(hr).toHaveStyle("height: 1px");
    expect(hr).toHaveStyle("opacity: 1");
  });

  it("Should render (HORIZONTALLY) ", () => {
    render(<Seperator direction="hor" data-testid="TEST_SEPERATOR" />);
    const hr = screen.getByTestId("TEST_SEPERATOR");

    expect(hr).toHaveStyle("width: 1px");
    expect(hr).toHaveStyle("height: 100%");
    expect(hr).toHaveStyle("opacity: 1");
  });
});
