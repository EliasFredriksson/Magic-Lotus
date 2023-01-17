import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import Image from "../Image";

describe("Image Component Tests", async () => {
  it("Should render", () => {
    render(
      <Image
        imageUrl=""
        fallbackImageUrl=""
        spinnerSize="medium"
        data-testid="TEST_IMAGE"
      />
    );
    const image = screen.getByTestId("TEST_IMAGE");
    expect(image).toBeInTheDocument();
  });

  it("Should change image.src to props 'fallbackImageUrl' on 'error' event", async () => {
    const PNG_PIXEL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

    render(
      <Image
        imageUrl={"LOAD_FAILURE_SRC"}
        fallbackImageUrl={PNG_PIXEL}
        spinnerSize="medium"
        alt="TEST_IMAGE"
      />
    );
    const image = screen.getByRole("img", { hidden: true });

    fireEvent.error(image);

    await waitFor(() => {
      expect(image).toHaveAttribute("src", PNG_PIXEL);
    });
  });

  it("Should hide 'loading overlay' on 'load' event", async () => {
    const PNG_PIXEL =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";

    render(
      <Image
        imageUrl={PNG_PIXEL}
        fallbackImageUrl={PNG_PIXEL}
        spinnerSize="medium"
        alt="TEST_IMAGE"
        data-testid="TEST_IMAGE"
      />
    );
    const imageComponent = screen.getByTestId("TEST_IMAGE");
    const image = screen.getByRole("img", { hidden: true });

    const overlay = imageComponent.children[1];

    expect(overlay).toHaveClass("show");
    fireEvent.load(image);
    await waitFor(() => {
      expect(overlay).not.toBeVisible();
    });
  });
});
