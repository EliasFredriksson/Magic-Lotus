import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import Input from "../Input";

describe("Input Component Tests", async () => {
  it("Should render", () => {
    render(
      <Input
        type="text"
        value={""}
        placeholder="TEST_INPUT"
        onChange={() => {}}
      />
    );

    const input = screen.getByPlaceholderText("TEST_INPUT");
    expect(input).toBeInTheDocument();
  });

  it("Should update 'inputState' when typed", async () => {
    let inputState = "";

    render(
      <Input
        type="text"
        value={inputState}
        placeholder="TEST_INPUT"
        onChange={(e) => {
          inputState = e.target.value;
        }}
      />
    );

    const input = screen.getByPlaceholderText("TEST_INPUT");

    expect(inputState).toEqual("");
    fireEvent.change(input, {
      target: {
        value: "CHANGED",
      },
    });
    expect(inputState).toEqual("CHANGED");
  });

  it("Should show / hide validation msg when invalid / valid", async () => {
    let inputState = "";
    let isValid: boolean = true;
    let validationMsg = "INVALID_INPUT";

    // YOU USE THE 'rerender' FUNCTION PROVIDED FROM 'render' TO SIMULATE
    // UPDATING PROPS
    const { rerender } = render(
      <Input
        type="text"
        value={inputState}
        placeholder="TEST_INPUT"
        onChange={(e) => {
          inputState = e.target.value;
        }}
        isValid={isValid}
        validationMsg={validationMsg}
      />
    );

    const input = screen.getByPlaceholderText("TEST_INPUT");
    const val = screen.getByText("INVALID_INPUT");

    expect(inputState).toEqual("");
    fireEvent.change(input, {
      target: {
        value: "CHANGED",
      },
    });
    expect(inputState).toEqual("CHANGED");

    expect(val).not.toBeVisible();
    isValid = false;

    // RERENDER TO UPDATE PROPS
    rerender(
      <Input
        type="text"
        value={inputState}
        placeholder="TEST_INPUT"
        onChange={(e) => {
          inputState = e.target.value;
        }}
        isValid={isValid}
        validationMsg={validationMsg}
      />
    );

    expect(val).toBeVisible();
  });
});
