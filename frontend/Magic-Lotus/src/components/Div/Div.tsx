import { Children, useEffect, useRef, useState } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  scrollThreshold?: number;
  sizeIncrement?: number;
}

const DEFAULT_SIZE_INCREMENT = 20;
const DEFAULT_SCROLL_THRESHOLD = 50;
const Div = (props: Props) => {
  const [renderCount, setRenderCount] = useState(20);
  const divRef = useRef<HTMLDivElement>(null);

  const childrenCount = Children.count(props.children);

  useEffect(() => {
    const container = divRef.current;
    if (container) {
      container.onscroll = () => {
        const totalHeight = container.scrollHeight - container.offsetHeight;
        const totalScroll = container.scrollTop;
        console.log("SCROLL: ", totalHeight, totalScroll);
        if (
          Math.abs(totalHeight - totalScroll) <
          (props.scrollThreshold
            ? props.scrollThreshold
            : DEFAULT_SCROLL_THRESHOLD)
        ) {
          if (renderCount < childrenCount)
            setRenderCount(
              (prev) =>
                (prev += props.sizeIncrement
                  ? props.sizeIncrement
                  : DEFAULT_SIZE_INCREMENT)
            );
        }
      };
    }
  }, [
    divRef.current,
    props.children,
    props.scrollThreshold,
    props.sizeIncrement,
  ]);

  return (
    <div {...props} ref={divRef}>
      {Children.map(props.children, (child, index) => {
        if (index > renderCount) return <></>;
        else return child;
      })}
    </div>
  );
};

export default Div;
