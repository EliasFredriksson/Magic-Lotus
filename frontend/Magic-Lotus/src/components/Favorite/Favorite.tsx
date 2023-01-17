import { useCallback } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth/useAuth";
import useUtility from "../../hooks/useUtility/useUtility";
import ICard from "../../models/scryfall/interfaces/ICard";
import {
  useFetchDeleteFavoriteCard,
  useFetchPostFavoriteCard,
} from "../../services/backend/User.service";
import "./favorite.scss";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  card: ICard | null;
  "data-testid"?: string;
}

const Favorite = (props: Props) => {
  const { isLoggedIn, credentials, refetch } = useAuth();
  const { openStatusModal } = useUtility();

  const addToFavorites = useFetchPostFavoriteCard();
  const removeFromFavorites = useFetchDeleteFavoriteCard();

  const addFav = useCallback(async () => {
    const card = props.card ? props.card : null;
    if (!card) {
      openStatusModal("No card avalible to add to favorites.");
      return;
    }
    const res = await addToFavorites.triggerFetch({
      params: {
        id: card.id,
        name: card.name,
        image: card.image_uris ? card.image_uris.normal : "",
      },
    });
    if (res.object === "aborted") return;
    if (
      res.object === "network_error" ||
      res.object === "unknown_error" ||
      res.object === "magic_lotus_error"
    ) {
      openStatusModal(res.error);
      return;
    }
    refetch();
  }, []);
  const removeFav = useCallback(async () => {
    const res = await removeFromFavorites.triggerFetch({
      params: {
        id: props.card ? props.card.id : "-1",
      },
    });
    if (res.object === "aborted") return;
    if (
      res.object === "network_error" ||
      res.object === "unknown_error" ||
      res.object === "magic_lotus_error"
    ) {
      openStatusModal(res.error);
      return;
    }
    refetch();
  }, []);

  const isFav = credentials.favoriteCards
    .map((card) => card.id)
    .includes(props.card ? props.card.id : "-1");
  return isLoggedIn ? (
    <div
      {...props}
      title={props.title ? props.title : "favorite-component"}
      className={`favorite-component${
        props.className ? ` ${props.className}` : ""
      }${isFav ? " is-fav" : " not-fav"}`}
      onClick={(e) => {
        if (isFav) removeFav();
        else addFav();
        if (props.onClick) props.onClick(e);
      }}
      data-testid={props["data-testid"] ? props["data-testid"] : undefined}
    >
      {isFav ? <IoHeartSharp /> : <IoHeartOutline />}
    </div>
  ) : (
    <></>
  );
};

export default Favorite;
