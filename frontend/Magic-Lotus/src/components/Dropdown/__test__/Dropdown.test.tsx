import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { expect } from "vitest";
import userEvent from "@testing-library/user-event";
import Dropdown, { Data } from "../Dropdown";

const BASIC_DROPDOWN_DATA: Data[] = [
  {
    id: "1",
    name: "alternative_1",
  },
  {
    id: "2",
    name: "alternative_2",
  },
  {
    id: "3",
    name: "alternative_3",
  },
];

describe("Dropdown Component Tests", () => {
  it("Should render", () => {
    render(
      <Dropdown
        data={[]}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {}}
      />
    );
    const dropdown = screen.getByPlaceholderText("TEST_DROPDOWN");
    expect(dropdown).toBeInTheDocument();
  });

  it("Should show options fron 'data' prop when open and 'max-height' changes", async () => {
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {}}
        menuHeight="40rem"
      />
    );
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const input = screen.getByPlaceholderText("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    // CHECK THAT CHILDREN ARE RENDERED
    expect(menu.children).toHaveLength(3);

    // MAX HEIGHT CHECK (FOR TRANSITION)
    expect(menu).toHaveStyle("max-height: 0px");

    userEvent.click(input);

    await waitFor(() => {
      expect(menu).toHaveClass("menu opened");
      expect(menu).toHaveStyle("max-height: 40rem");
    });
  });

  it("(NORMAL) Should change 'value' to the first option in 'data' props in menu", async () => {
    let value = null;
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {
          value = entries;
        }}
      />
    );
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    expect(value).toBeNull();
    fireEvent.click(menu.children[0]);
    expect(JSON.stringify(value)).toBe(
      JSON.stringify([BASIC_DROPDOWN_DATA[0]])
    );
  });

  it("(MULTI CHOICE) Should change 'value' to the alternatives that are chosen", async () => {
    let value = null;
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        multiChoice
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {
          value = entries;
        }}
      />
    );
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    expect(value).toBeNull();
    fireEvent.click(menu.children[0]);
    fireEvent.click(menu.children[1]);
    fireEvent.click(menu.children[2]);
    expect(JSON.stringify(value)).toBe(JSON.stringify(BASIC_DROPDOWN_DATA));
  });

  it("(SEARCHABLE) Should change 'value' to the alternative including searched text in its name", async () => {
    let value = null;
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        searchable
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {
          value = entries;
        }}
      />
    );
    const input = screen.getByPlaceholderText("TEST_DROPDOWN");
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    expect(menu.children).toHaveLength(3);

    fireEvent.change(input, {
      target: {
        value: "_1",
      },
    });

    waitFor(() => {
      expect(menu.children).toHaveLength(1);
    });

    expect(value).toBeNull();
    fireEvent.click(menu.children[0]);

    // CHECK THAT 'value' HAS CHANGED TO A LIST ONLY CONTAINING ONE ELEMENT
    // WHICH IS THE FIRST CHOICE IN 'data'
    expect(JSON.stringify(value)).toBe(
      JSON.stringify([BASIC_DROPDOWN_DATA[0]])
    );
  });

  it("(DISABLED) Should not be interactable", async () => {
    let value = null;
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        disabled
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {
          value = entries;
        }}
      />
    );
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const input = screen.getByPlaceholderText("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    // MAX HEIGHT CHECK (FOR TRANSITION)
    expect(menu).toHaveStyle("max-height: 0px");
    userEvent.click(input);
    await waitFor(() => {
      expect(menu).toHaveClass("menu closed");
      expect(menu).toHaveStyle("max-height: 0px");
    });
  });

  it("(START VALUE) Should make all entries in 'data' prop provided in 'startValue' props have the 'active' class", async () => {
    let value: any[] = [];
    render(
      <Dropdown
        data-testid="TEST_DROPDOWN"
        disabled
        data={BASIC_DROPDOWN_DATA}
        placeholder="TEST_DROPDOWN"
        onSelect={(entries) => {
          value = entries;
        }}
        startValue={BASIC_DROPDOWN_DATA}
      />
    );
    const dropdown = screen.getByTestId("TEST_DROPDOWN");
    const menu = await within(dropdown).findByTestId("TEST_DROPDOWN_MENU");

    expect(menu.children[0]).toHaveClass("active");
    expect(menu.children[1]).toHaveClass("active");
    expect(menu.children[2]).toHaveClass("active");
  });
});
