import "./magicCard.scss";
import ICard from "../../models/scryfall/interfaces/ICard";
import Image from "../Image/Image";
import useScreenSize from "../../hooks/useScreenSize/useScreenSize";
import { useCallback } from "react";

type Props = {
  card: ICard | null;
  disabled?: boolean;
};

const MagicCard = (props: Props) => {
  const { breakpoints } = useScreenSize();

  const calcWidth = useCallback(() => {
    if (breakpoints.IS_MOBILE) return "30rem";
    if (breakpoints.IS_TABLET) return "25rem";
    if (breakpoints.IS_LAPTOP) return "25rem";
    if (breakpoints.IS_DESKTOP) return "22rem";
  }, [breakpoints]);

  return (
    <div className={`magic-card-component ${props.disabled ? "disabled" : ""}`}>
      <Image
        imageUrl={props.card?.image_uris?.large}
        fallbackImageUrl={""}
        spinnerSize="medium"
        imageSize={{
          width: calcWidth(),
        }}
      />
      CARD
    </div>
  );
};

export default MagicCard;
