import { fireEvent, render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Choice, { ChoiceData } from "../Choice";

const BASIC_CHOICE_DATA: ChoiceData[] = [
  {
    id: "1",
    name: "choice_1",
  },
  {
    id: "2",
    name: "choice_2",
  },
  {
    id: "3",
    name: "choice_3",
  },
];
const IMAGE_CHOICE_DATA: ChoiceData[] = [
  {
    id: "1",
    name: "choice_1",
    image: "faulty-image",
    fallbackImage: "",
  },
  {
    id: "2",
    name: "choice_2",
  },
];

describe("Choice Component Tests", () => {
  it("Should render", () => {
    render(
      <Choice
        data={[]}
        onChange={() => {}}
        variant="radio"
        data-testid="TEST_CHOICE"
      />
    );
    const choice = screen.getByTestId("TEST_CHOICE");
    expect(choice).toBeInTheDocument();
  });

  it("Should have same options as provided in 'data' prop", () => {
    render(
      <Choice
        data={BASIC_CHOICE_DATA}
        onChange={() => {}}
        variant="radio"
        data-testid="TEST_CHOICE"
      />
    );
    const choice = screen.getByTestId("TEST_CHOICE");
    expect(choice).toBeInTheDocument();

    expect(choice.children).toHaveLength(3);

    expect(choice.children[0]).toHaveTextContent("choice_1");
    expect(choice.children[1]).toHaveTextContent("choice_2");
    expect(choice.children[2]).toHaveTextContent("choice_3");
  });

  it("(RADIO) Should trigger onChange on click, only one option active at a time", () => {
    let value: any[] = [];
    render(
      <Choice
        data={BASIC_CHOICE_DATA}
        onChange={(choices) => {
          value = choices;
        }}
        variant="radio"
        data-testid="TEST_CHOICE"
      />
    );
    expect(value).toHaveLength(0);

    const choice_one = screen.getByTestId("choice_1");
    fireEvent.click(choice_one);

    expect(value).toHaveLength(1);
    expect(value[0].name).toBe("choice_1");

    const choice_two = screen.getByTestId("choice_2");
    fireEvent.click(choice_two);

    expect(value).toHaveLength(1);
    expect(value[0].name).toBe("choice_2");
  });

  it("(CHECKBOX) Should trigger onChange on click, multiple option can be active at a time", () => {
    let value: any[] = [];
    render(
      <Choice
        data={BASIC_CHOICE_DATA}
        onChange={(choices) => {
          value = choices;
        }}
        variant="checkbox"
        data-testid="TEST_CHOICE"
      />
    );
    expect(value).toHaveLength(0);

    const choice_one = screen.getByTestId("choice_1");
    fireEvent.click(choice_one);

    expect(value).toHaveLength(1);
    expect(value[0].name).toBe("choice_1");

    const choice_two = screen.getByTestId("choice_2");
    fireEvent.click(choice_two);

    expect(value).toHaveLength(2);
    expect(value[1].name).toBe("choice_2");
  });

  it("Should render optional image if provided in 'data' prop", () => {
    render(
      <Choice
        data={IMAGE_CHOICE_DATA}
        onChange={(choices) => {}}
        variant="radio"
        data-testid="TEST_CHOICE"
      />
    );

    const choice_one = screen.getByTestId("choice_1");
    fireEvent.click(choice_one);

    const image_one = screen.queryByAltText("choice_1");
    expect(image_one).not.toBeNull();

    const image_two = screen.queryByAltText("choice_12");
    expect(image_two).toBeNull();
  });
});
