import { NavigateOptions, To, useOutletContext } from "react-router-dom";

export type OutletContext = {
  show: boolean;
  setShow: (show: boolean) => void;
  navigate: (to: To | number, options?: NavigateOptions) => void;
  goToPage: () => void;
};
const useRouterContext = () => {
  return useOutletContext<OutletContext>();
};

export default useRouterContext;
