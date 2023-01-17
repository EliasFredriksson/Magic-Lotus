import "./magicCard.scss";
import ICard from "../../models/scryfall/interfaces/ICard";
import Image from "../Image/Image";
import { useCallback } from "react";
import { Formats } from "../../models/scryfall/types/ImageFormat";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import { PUBLIC_FOLDER } from "../../Public";
type CardOption = Formats | "result";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  card: ICard | null;
  disabled?: boolean;
  size: CardOption;
  quality: Formats;
}

const MagicCard = (props: Props) => {
  const { breakpoints } = useScreenSize();

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
        fallbackImageUrl={PUBLIC_FOLDER.IMAGES.CARD.BACKSIDE} // TO BE ADDED
        spinnerSize="medium"
        imageSize={
          breakpoints.IS_MOBILE || breakpoints.IS_TABLET
            ? {
                width: "auto",
              }
            : {
                width: "29rem",
              }
        }
      />
    </div>
  );
};

export default MagicCard;
