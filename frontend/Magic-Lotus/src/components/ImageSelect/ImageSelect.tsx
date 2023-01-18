import { useCallback, useEffect, useRef, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IFile from "../../models/backend/interfaces/IFile";
import Spinner from "../Spinner/Spinner";
import "./imageSelect.scss";

const BLANK_IFILE: IFile = {
  name: "",
  file: "",
  type: "",
};
interface ISize {
  width?: string;
  height?: string;
}
interface IProps {
  imageUrl?: string | undefined;
  fallbackImageUrl: string;
  imageSize?: ISize;
  onSave: (data: IFile) => void;
  name: string;

  // OPTIONAL
  onDelete?: (data: IFile) => void;
  saveOnChoice?: boolean;
  className?: string;
  editImageSize?: ISize;
  saveButtonInnerTsx?: string | React.ReactNode;
  deleteButtonInnerTsx?: string | React.ReactNode;

  // TESTING
  "data-testid"?: string;
}

const TEN_MEGABYTE = 10e6;

const ImageSelect = (props: IProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    props.imageUrl ? props.imageUrl : props.fallbackImageUrl
  );

  const [isLoading, setIsLoading] = useState(false);

  const [fileData, setFileData] = useObjectState<IFile>(BLANK_IFILE);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.target.files !== null && e.target.files.length > 0) {
        setIsLoading(true);
        const file = e.target.files[0];
        if (file.size > TEN_MEGABYTE) {
          return setErrorMsg(
            "The filesize is too large, please choose an image which is smaller than 10 MG."
          );
        }
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
          if (props.saveOnChoice) props.onSave(BLANK_IFILE);
          return setErrorMsg(
            "Unallowed file format. Please choose a .png, .jpeg or jpg file."
          );
        }
        if (file && file.type.substring(0, 5) === "image") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
            const finalFile: IFile = {
              name: file.name,
              file: reader.result as string,
              type: file.type,
            };
            setFileData(finalFile);
            if (props.saveOnChoice) props.onSave(finalFile);
            setIsLoading(false);
          };
          reader.readAsDataURL(file);
        } else {
          setFileData(BLANK_IFILE);
          setPreviewUrl(props.fallbackImageUrl);
        }
      }
    },
    []
  );

  const handleSave = useCallback(() => {
    if (JSON.stringify(BLANK_IFILE) !== JSON.stringify(fileData))
      props.onSave(fileData);
  }, [props.onSave, fileData]);

  const handleDelete = useCallback(() => {
    if (props.onDelete) props.onDelete(fileData);
    setFileData(BLANK_IFILE);
    setPreviewUrl(props.fallbackImageUrl);
  }, [props.onDelete, props.fallbackImageUrl, fileData]);

  // ON MOUNT, ON CHANGED IMAGE URL AND IF PROP IMAGE_URL HAS CHANGED
  // AND USER HAS NOT UPLOADED NEW IMAGE FILE, SHOW SPINNER.
  // TURNS OFF WHEN <img> TAG HAS LOADED SAID IMAGE.
  useEffect(() => {
    if (previewUrl !== props.imageUrl) {
      setIsLoading(true);
      setPreviewUrl(props.imageUrl ? props.imageUrl : props.fallbackImageUrl);
    }
  }, [props.imageUrl, props.fallbackImageUrl]);

  return (
    <div
      className={`image-select-component`}
      data-testid={props["data-testid"] ? props["data-testid"] : undefined}
    >
      <div
        className="preview"
        style={{
          width: props.imageSize?.width,
          height: props.imageSize?.height,
        }}
      >
        <img
          src={previewUrl}
          onLoad={() => {
            setIsLoading(false);
          }}
          onError={() => {
            setPreviewUrl(props.fallbackImageUrl);
            setIsLoading(false);
          }}
        />

        <div className={`loading-overlay ${isLoading ? "show" : "hide"}`}>
          <Spinner size="large" variant="pulse" />
        </div>
      </div>

      {errorMsg.length > 0 && <span className="error-msg">{errorMsg}</span>}

      <div className="choose-image-button">
        <label htmlFor="file-upload-profile">
          <input
            ref={inputRef}
            type="file"
            id="file-upload-profile"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
            name={props.name}
          />
          <span>
            Choose image <RiAddLine />
          </span>
        </label>
      </div>
      {previewUrl !== props.fallbackImageUrl && (
        <button
          className="delete-button"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          {props.deleteButtonInnerTsx ? props.deleteButtonInnerTsx : "Remove"}
        </button>
      )}
      {!props.saveOnChoice && (
        <button
          className="save-button"
          onClick={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {props.saveButtonInnerTsx ? props.saveButtonInnerTsx : "Save"}
        </button>
      )}
    </div>
  );
};

export default ImageSelect;
