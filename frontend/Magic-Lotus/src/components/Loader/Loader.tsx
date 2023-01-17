import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import "./loader.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Loader = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  const { className, ...rest } = props;
  return (
    <div
      {...rest}
      className={`loader-component${isVisible ? " fade-in" : " fade-out"}${
        className ? ` ${className}` : ""
      }`}
    >
      <Spinner size="x-large" variant="pulse" />
    </div>
  );
};

export default Loader;
