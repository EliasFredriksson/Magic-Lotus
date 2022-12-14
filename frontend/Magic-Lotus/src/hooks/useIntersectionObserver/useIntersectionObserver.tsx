import { useEffect, useRef, useState } from "react";

type IIntersectionState<T> = {
  ref: React.MutableRefObject<T | null>;
  inView: boolean;
};

export default function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit
): IIntersectionState<T> {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setInView(entry.isIntersecting);
    }, options);
    if (ref.current) observer.observe(ref.current);
  }, [ref, options]);

  return { ref, inView };
}
