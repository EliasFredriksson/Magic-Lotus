export default interface ICatalog {
  category: string;
  uri: string;
  total_values: number;
  data: string[];
}

export const BLANK_CATALOG: ICatalog = {
  category: "",
  uri: "",
  total_values: 0,
  data: [],
};
