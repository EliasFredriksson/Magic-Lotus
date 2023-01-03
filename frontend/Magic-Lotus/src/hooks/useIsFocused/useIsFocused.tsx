import React, { useEffect, useState } from "react";

const useIsFocused = (ref: React.RefObject<HTMLElement>): boolean => {
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (document.activeElement === ref.current) setFocused(true);
    else setFocused(false);
  }, [document.activeElement]);

  return focused;
};

export default useIsFocused;
