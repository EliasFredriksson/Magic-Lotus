import useFetch from "../../../hooks/useFetch/useFetch";
import ICard from "../../../models/scryfall/interfaces/ICard";
import { Formats } from "../../../models/scryfall/types/ImageFormat";
import ScryfallError from "../../../models/scryfall/types/ScryfallError";

// QUERY PARAMS
export interface GetRandomCard {
  format?: "json" | "text" | "image"; // The data format to return: json, text, or image. Defaults to json.
  face?: string; // If using the image format and this parameter has the value back, the back face of the card will be returned. Will return a 422 if this card has no back face.
  version?: Formats; // The image version to return when using the image format: small, normal, large, png, art_crop, or border_crop. Defaults to large.
  pretty?: boolean; // If true, the returned JSON will be prettified. Avoid using for production code.
}
// ROUTE
const useFetchRandomCard = () => {
  return useFetch<ICard, ScryfallError, null, GetRandomCard>({
    base: "SCRYFALL",
    method: "GET",
    route: `/cards/random`,
  });
};
export default useFetchRandomCard;
