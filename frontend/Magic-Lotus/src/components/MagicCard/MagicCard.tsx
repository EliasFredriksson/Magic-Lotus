import "./magicCard.scss";
import ICard from "../../models/scryfall/interfaces/ICard";
import Image from "../Image/Image";
import { useCallback } from "react";
import { Formats } from "../../models/scryfall/types/ImageFormat";
type ImagerySize =
  | "small"
  | "normal"
  | "large"
  | "art_crop"
  | "border_crop"
  | "png";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  card: ICard | null;
  disabled?: boolean;
  size: ImagerySize;
  quality: Formats;
}

const MagicCard = (props: Props) => {
  const calcSize = useCallback(() => {
    switch (props.size) {
      case "small":
        return {
          width: "146px",
          height: "204px",
        };
      case "normal":
        return {
          width: "488px",
          height: "680px",
        };
      case "large":
        return {
          width: "672px",
          height: "936px",
        };
      case "art_crop":
        return {
          width: "auto",
          height: "auto",
        };
      case "border_crop":
        return {
          width: "480px",
          height: "680px",
        };
      case "png":
        return {
          width: "745px",
          height: "1040px",
        };
    }
  }, [props.size]);

  const calcImage = useCallback(() => {
    switch (props.quality) {
      case "small": // LOWEST QUALITY
        return props.card?.image_uris?.small;
      case "normal":
        return props.card?.image_uris?.normal;
      case "large":
        return props.card?.image_uris?.large;
      case "png": // HIGHEST QUALITY
        return props.card?.image_uris?.png;
      case "art_crop":
        return props.card?.image_uris?.art_crop;
      case "border_crop":
        return props.card?.image_uris?.border_crop;
      default:
        return props.card?.image_uris?.normal;
    }
  }, [props.card, props.quality]);

  const { onClick, disabled, ...rest } = props;
  return (
    <div
      {...rest}
      className={`magic-card-component${disabled ? " disabled" : ""}${
        props.className ? ` ${props.className}` : ""
      }`}
      onClick={(e) => {
        if (!disabled && onClick) onClick(e);
      }}
    >
      <Image
        imageUrl={calcImage()}
        fallbackImageUrl={""} // TO BE ADDED
        spinnerSize="medium"
        imageSize={calcSize()}
      />
    </div>
  );
};

export default MagicCard;
