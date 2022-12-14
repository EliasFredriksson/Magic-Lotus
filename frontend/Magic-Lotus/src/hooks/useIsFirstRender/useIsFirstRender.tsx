import { useRef } from "react";

// A SIMPLE HOOK THAT RETURNS A BOOLEAN INDICATING
// IF ITS THE INITIAL RENDER OR NOT.
const useIsFirstRender = (): boolean => {
  const isFirst = useRef(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
};

export default useIsFirstRender;
