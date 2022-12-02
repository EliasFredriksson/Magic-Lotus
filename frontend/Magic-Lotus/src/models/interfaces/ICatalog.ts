export default interface ICatalog {
  object: "catalog"; // The type for this object. Always "catalog"
  total_values: number; // Number of items in the data array.
  data: string[]; // The result. Always a list of strings.
}
