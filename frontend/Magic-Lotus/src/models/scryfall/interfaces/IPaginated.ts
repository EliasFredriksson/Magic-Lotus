export default interface Paginated<T> {
  data: T[];
  has_more: boolean;
  next_page?: string | null;
  total_cards?: number | null;
  warnings?: string[] | null;
}
