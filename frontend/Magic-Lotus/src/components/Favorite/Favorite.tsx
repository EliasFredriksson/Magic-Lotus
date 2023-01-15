import { useCallback, useEffect, useState } from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth/useAuth";
import useUtility from "../../hooks/useUtility/useUtility";
import {
  useFetchDeleteFavoriteCard,
  useFetchPostFavoriteCard,
} from "../../services/backend/User.service";
import "./favorite.scss";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  cardId: string;
}

const Favorite = (props: Props) => {
  const { isLoggedIn, credentials, refetch } = useAuth();
  const { openStatusModal } = useUtility();

  const addToFavorites = useFetchPostFavoriteCard(props.cardId);
  const removeFromFavorites = useFetchDeleteFavoriteCard(props.cardId);

  const addFav = useCallback(async () => {
    const res = await addToFavorites.triggerFetch();
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
    const res = await removeFromFavorites.triggerFetch();
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

  const isFav = credentials.favoriteCards.includes(props.cardId);
  return isLoggedIn ? (
    <div
      {...props}
      className={`favorite-component${
        props.className ? ` ${props.className}` : ""
      }${isFav ? " is-fav" : " not-fav"}`}
      onClick={(e) => {
        if (isFav) removeFav();
        else addFav();
        if (props.onClick) props.onClick(e);
      }}
    >
      {isFav ? <IoHeartSharp /> : <IoHeartOutline />}
    </div>
  ) : (
    <></>
  );
};

export default Favorite;
