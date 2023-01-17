import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Header from "../Header";

describe("Header Component Tests", async () => {
  it("Should render", () => {
    render(<Header data-testid="TEST_HEADER_TITLE" />);
    const header = screen.getByTestId("TEST_HEADER_TITLE");
    expect(header).toBeInTheDocument();
  });

  it("Should change title when clicking button", () => {
    let title = "START_TITLE";
    function changeTitle() {
      title = "CHANGED_TITLE";
    }

    render(
      <>
        <Header title={title} />
        <button onClick={changeTitle}>CHANGE_TEST_HEADER_TITLE</button>
      </>
    );

    const button = screen.getByText("CHANGE_TEST_HEADER_TITLE");

    expect(title).toBe("START_TITLE");
    fireEvent.click(button);
    expect(title).toBe("CHANGED_TITLE");
  });
});
