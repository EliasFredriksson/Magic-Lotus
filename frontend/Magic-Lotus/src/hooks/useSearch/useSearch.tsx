import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
