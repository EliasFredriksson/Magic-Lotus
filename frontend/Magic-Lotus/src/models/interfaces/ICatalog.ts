export default interface ICatalog {
  object: "catalog"; // The type for this object. Always "catalog"
  uri: string; // URI  // https:// link to the resource on ScryfallAPI.
  total_values: number; // Number of items in the data array.
  data: string[]; // The result. Always a list of strings.
}
