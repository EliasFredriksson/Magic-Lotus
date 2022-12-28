import "./main.scss";
import { useCallback, useEffect, useState } from "react";
import useRouterContext from "../../hooks/useRouterContext/useRouterContext";

type Props = {
  id: string;
  delay?: number;
  children?: React.ReactNode;
  onUnmounted?: () => void;
};

const DEFAULT_DELAY = 1000; // 500 ms
const Main = (props: Props) => {
  const { show, goToPage } = useRouterContext();
  const [shouldRender, setRender] = useState(show);
  useEffect(() => {
    if (show) setRender(true);
  }, [show]);

  const onAnimationEnd = useCallback(() => {
    if (!show) {
      setRender(false);
      if (props.onUnmounted) props.onUnmounted();
      goToPage();
    }
  }, [show]);

  return shouldRender ? (
    <main
      id={props.id}
      className="use-render-animation-hook"
      style={{
        animation: `${show ? "show" : "hide"} ${DEFAULT_DELAY}ms forwards`,
      }}
      onAnimationEnd={onAnimationEnd}
    >
      {props.children}
    </main>
  ) : (
    <></>
  );
};

export default Main;
