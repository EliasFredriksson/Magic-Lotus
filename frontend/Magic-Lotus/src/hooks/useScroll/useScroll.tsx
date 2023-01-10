import { useCallback } from "react";

const useScroll = (ref: React.RefObject<HTMLElement>) => {
  const scroll = useCallback(() => {
    if (ref.current)
      ref.current.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
  }, [ref]);
  return scroll;
};

export default useScroll;
