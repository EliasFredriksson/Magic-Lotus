import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import Collapse from "../Collapse";

describe("Collapse Component Tests", () => {
  it("Should render", () => {
    render(
      <Collapse
        direction="vertical"
        isOpen={true}
        openSize="300px"
        data-testid="TEST_COLLAPSE"
      />
    );
    const collapse = screen.getByTestId("TEST_COLLAPSE");
    expect(collapse).toBeInTheDocument();
  });

  it("Should toggle open on button click, menu should have different max-height if open or not", () => {
    let isOpen = false;

    render(
      <>
        <Collapse
          direction="vertical"
          isOpen={isOpen}
          openSize="300px"
          data-testid="TEST_COLLAPSE"
        />
        <button
          onClick={() => {
            isOpen = !isOpen;
          }}
        >
          TOGGLE_BUTTON
        </button>
      </>
    );
    const collapse = screen.getByTestId("TEST_COLLAPSE");
    const button = screen.getByText("TOGGLE_BUTTON");

    expect(collapse).toHaveStyle("max-height: 0px");

    fireEvent.click(button);

    waitFor(
      () => {
        expect(collapse).toHaveStyle("max-height: 300px");
      },
      {
        timeout: 1000,
      }
    );

    fireEvent.click(button);

    waitFor(
      () => {
        expect(collapse).toHaveStyle("max-height: 0px");
      },
      {
        timeout: 1000,
      }
    );
  });
});
