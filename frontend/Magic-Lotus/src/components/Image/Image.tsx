import { useEffect, useMemo, useRef, useState } from "react";
import Spinner, { ISpinnerSize } from "../Spinner/Spinner";
import "./image.scss";

interface ISize {
  width?: string;
  height?: string;
}
interface IProps {
  imageUrl: string | undefined;
  fallbackImageUrl: string;
  imageSize?: ISize;
  spinnerSize: ISpinnerSize;
  borderRadius?: string;
  alt?: string;
  onClick?: () => void;

  // SIZES // 745 × 1040
  width?: number;
  height?: number;
}

const Image = (props: IProps) => {
  const [previewUrl, setPreviewUrl] = useState(
    props.imageUrl ? props.imageUrl : props.fallbackImageUrl
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (props.imageUrl && previewUrl !== props.imageUrl) {
      setPreviewUrl(props.imageUrl);
    }
  }, [props.imageUrl]);

  return (
    <div
      className={`image-component${props.onClick ? " clickable" : ""}`}
      style={
        props.imageSize
          ? {
              width: props.imageSize.width,
              height: props.imageSize.height,
            }
          : undefined
      }
    >
      <img
        onClick={props.onClick}
        alt={props.alt}
        src={previewUrl}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setPreviewUrl(props.fallbackImageUrl);
        }}
        style={{
          borderRadius: props.borderRadius ? props.borderRadius : "1rem",
        }}
        loading="lazy"
        width={props.width}
        height={props.height}
      />

      <div
        className={`loading-overlay ${isLoading ? "show" : "hide"}`}
        style={{
          borderRadius: props.borderRadius ? props.borderRadius : "1rem",
        }}
      >
        <Spinner size={props.spinnerSize} variant="pulse" />
      </div>
    </div>
  );
};

export default Image;
