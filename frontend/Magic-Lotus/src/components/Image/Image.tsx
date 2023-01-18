import { useEffect, useMemo, useRef, useState } from "react";
import Spinner, { ISpinnerSize } from "../Spinner/Spinner";
import "./image.scss";

interface ISize {
  width?: string;
  height?: string;
}
interface IProps extends React.HTMLAttributes<HTMLImageElement> {
  imageUrl: string | undefined;
  fallbackImageUrl: string;
  imageSize?: ISize;
  spinnerSize: ISpinnerSize;
  borderRadius?: string;
  alt?: string;
  "data-testid"?: string;
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

  const {
    imageUrl,
    imageSize,
    fallbackImageUrl,
    spinnerSize,
    borderRadius,
    "data-testid": testId,
    ...rest
  } = props;
  return (
    <div
      className={`image-component${props.onClick ? " clickable" : ""}`}
      style={
        props.imageSize
          ? {
              width: props.imageSize?.width,
              height: props.imageSize?.height,
            }
          : undefined
      }
      data-testid={testId ? testId : undefined}
    >
      <img
        {...rest}
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
        width={props.imageSize?.width}
        height={props.imageSize?.height}
      />

      <div
        className={`loading-overlay ${isLoading ? "show" : "hide"}`}
        style={{
          borderRadius: props.borderRadius ? props.borderRadius : "1rem",
          opacity: isLoading ? 1 : 0,
          transition: "opacity 0.1s ease",
        }}
      >
        <Spinner size={props.spinnerSize} variant="pulse" />
      </div>
    </div>
  );
};

export default Image;
