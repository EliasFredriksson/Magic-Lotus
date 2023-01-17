import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect } from "vitest";
import IFile, { BLANK_IFILE } from "../../../models/backend/interfaces/IFile";
import ImageSelect from "../ImageSelect";

describe("ImageSelect Component Tests", async () => {
  it("Should render", () => {
    render(
      <ImageSelect
        data-testid="TEST_IMAGE_SELECT"
        name="test"
        imageUrl=""
        fallbackImageUrl=""
        onSave={() => {}}
      />
    );
    const image = screen.getByTestId("TEST_IMAGE_SELECT");
    expect(image).toBeInTheDocument();
  });

  it("Should not allow unallowed file formats except: 'png', 'jpeg' and 'jpg'", async () => {
    // PNG
    const VALID_FILE_PNG = new File(["(⌐□_□)"], "cool_guy.png", {
      type: "image/png",
    });
    const IFILE_PNG: IFile = {
      name: "cool_guy.png",
      file: "data:image/png;base64,KOKMkOKWoV/ilqEp",
      type: "image/png",
    };

    // JPEG
    const VALID_FILE_JPEG = new File(["(Θ︹Θ)ს"], "angry_guy.jpeg", {
      type: "image/jpeg",
    });
    const IFILE_JPEG: IFile = {
      name: "angry_guy.jpeg",
      file: "data:image/jpeg;base64,KM6Y77i5zpgp4YOh",
      type: "image/jpeg",
    };

    // JPG
    const VALID_FILE_JPG = new File(["〔´∇｀〕"], "happy_guy.jpg", {
      type: "image/jpg",
    });
    const IFILE_JPG: IFile = {
      name: "happy_guy.jpg",
      file: "data:image/jpg;base64,44CUwrTiiIfvvYDjgJU=",
      type: "image/jpg",
    };

    // GIF (INVALID)
    const INVALID_FILE = new File(["~( ˘▾˘~)"], "dance_guy.gif", {
      type: "image/gif",
    });
    const IFILE_INVALID: IFile = BLANK_IFILE;

    // ################################ TEST ################################
    let file: IFile;
    render(
      <ImageSelect
        saveOnChoice
        name="test"
        imageUrl=""
        fallbackImageUrl=""
        onSave={(f) => {
          file = f;
        }}
      />
    );

    const input = screen.getByLabelText("Choose image") as HTMLInputElement;

    // PNG
    fireEvent.change(input, {
      target: {
        files: [VALID_FILE_PNG],
      },
    });
    if (input.files) {
      expect(input.files[0]).toStrictEqual(VALID_FILE_PNG);
      await waitFor(() => {
        expect(file).toStrictEqual(IFILE_PNG);
      });
    } else fail("Filelist was null");

    // JPEG
    fireEvent.change(input, {
      target: {
        files: [VALID_FILE_JPEG],
      },
    });
    if (input.files) {
      expect(input.files[0]).toStrictEqual(VALID_FILE_JPEG);
      await waitFor(() => {
        expect(file).toStrictEqual(IFILE_JPEG);
      });
    } else fail("File list was null");

    // JPG
    fireEvent.change(input, {
      target: {
        files: [VALID_FILE_JPG],
      },
    });
    if (input.files) {
      expect(input.files[0]).toStrictEqual(VALID_FILE_JPG);
      await waitFor(() => {
        expect(file).toStrictEqual(IFILE_JPG);
      });
    } else fail("File list was null");

    // GIF (INVALID)
    fireEvent.change(input, {
      target: {
        files: [INVALID_FILE],
      },
    });
    if (input.files) {
      expect(input.files[0]).toStrictEqual(INVALID_FILE);
      await waitFor(() => {
        expect(file).toStrictEqual(IFILE_INVALID);
      });
    } else fail("File list was null");
  });
});
