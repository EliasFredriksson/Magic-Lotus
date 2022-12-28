import { useContext } from "react";
import { NavigateContext } from "../../contexts/NavigateContext";

const useNavigate = () => {
  return useContext(NavigateContext);
};

export default useNavigate;
