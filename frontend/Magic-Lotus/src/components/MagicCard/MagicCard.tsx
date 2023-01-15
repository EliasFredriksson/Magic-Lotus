import "./magicCard.scss";
import ICard from "../../models/scryfall/interfaces/ICard";
import Image from "../Image/Image";
import { useCallback } from "react";
import { Formats } from "../../models/scryfall/types/ImageFormat";

type Props = {
  card: ICard | null;
  disabled?: boolean;
  size: "small" | "normal" | "large";
  quality: Formats;
};

const MagicCard = (props: Props) => {
  const calcSize = useCallback(() => {
    switch (props.size) {
      case "small":
        return {
          width: "14rem",
        };
      case "normal":
        return {
          width: "22rem",
        };
      case "large":
        return {
          width: "30rem",
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

  return (
    <div className={`magic-card-component ${props.disabled ? "disabled" : ""}`}>
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
