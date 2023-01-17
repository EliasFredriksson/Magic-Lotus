import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Loader from "../Loader";

describe("Loader Component Tests", async () => {
  it("Should render", () => {
    render(<Loader role="loader" />);
    const loader = screen.getByRole("loader");
    expect(loader).toBeInTheDocument();
  });
});
