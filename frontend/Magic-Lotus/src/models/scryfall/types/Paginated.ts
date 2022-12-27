import ICard from "../interfaces/ICard";

type Paginated<T> = {
  object: "list";
  data: T;
  has_more: boolean;
  next_page?: string | null;
  total_cards?: number | null;
  warnings?: string[] | null;
};
export default Paginated;

export const BLANK_PAGINATED: Paginated<any> = {
  object: "list",
  data: [],
  has_more: false,
};
export const BLANK_PAGINATED_CARDS: Paginated<ICard[]> = {
  object: "list",
  data: [],
  has_more: false,
};
