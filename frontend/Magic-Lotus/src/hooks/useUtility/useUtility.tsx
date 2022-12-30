import { useContext } from "react";
import { UtilityContext } from "../../contexts/UtilityContext";

const useUtility = () => {
  return useContext(UtilityContext);
};

export default useUtility;
