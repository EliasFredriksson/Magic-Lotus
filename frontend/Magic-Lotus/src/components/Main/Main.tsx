import "./main.scss";
import { useCallback, useEffect, useState } from "react";
import useNavigate from "../../hooks/useNavigate/useNavigate";

type Props = {
  id: string;
  children?: React.ReactNode;
  onUnmounted?: () => void;
};

const DEFAULT_DELAY = 1000; // 1000 ms
const Main = (props: Props) => {
  const { show, goToPage } = useNavigate();
  const [shouldRender, setRender] = useState(show);

  useEffect(() => {
    if (show) setRender(true);
  }, []);

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
