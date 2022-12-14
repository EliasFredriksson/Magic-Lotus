import React, { useEffect } from "react";

export default function useOutsideClick(
  refObject: React.RefObject<HTMLElement>,
  onOutsideClick: () => void
): void {
  useEffect(() => {
    function handleOutsideClick(e: Event) {
      if (!e.target) return;
      if (!refObject.current) return;
      const castedTarget: Node = e.target as Node;
      if (!refObject.current.contains(castedTarget)) onOutsideClick();
    }
    const root = document.querySelector("#root");
    if (!root) return;
    root.addEventListener("click", handleOutsideClick);
    return function cleanup() {
      root.removeEventListener("click", handleOutsideClick);
    };
  });
}
