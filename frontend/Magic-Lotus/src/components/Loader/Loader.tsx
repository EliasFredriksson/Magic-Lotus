import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import "./loader.scss";

const Loader = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div className={`loader-component ${isVisible ? "fade-in" : "fade-out"}`}>
      <Spinner size="x-large" variant="pulse" />
    </div>
  );
};

export default Loader;
