import { useEffect, useMemo, useRef, useState } from "react";

type IIntersectionState<T> = {
  ref: React.MutableRefObject<T | null>;
  inView: boolean;
  observer: IntersectionObserver;
};

export default function useIntersectionObserver<T extends Element>(
  options?: IntersectionObserverInit
): IIntersectionState<T> {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);
  const observer = useMemo(
    () =>
      new IntersectionObserver((entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      }, options),
    [ref, options]
  );

  return { ref, inView, observer };
}
