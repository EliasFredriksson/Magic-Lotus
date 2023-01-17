import "./main.scss";
import { useCallback, useEffect, useState } from "react";
import useNavigate from "../../hooks/useNavigate/useNavigate";

interface Props extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children?: React.ReactNode;
  onUnmounted?: () => void;
}

const Main = (props: Props) => {
  const { onUnmounted, children, id, ...rest } = props;
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
      {...rest}
      id={id}
      className={`main-component${show ? " show" : " hide"}`}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="middle">{children}</div>
    </main>
  ) : (
    <></>
  );
};

export default Main;
