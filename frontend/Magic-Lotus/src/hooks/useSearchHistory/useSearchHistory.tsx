import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";

const useSearchHistory = () => {
  return useContext(SearchContext);
};

export default useSearchHistory;
