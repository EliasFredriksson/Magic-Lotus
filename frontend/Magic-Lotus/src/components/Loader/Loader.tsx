import Spinner from "../Spinner/Spinner";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader-component">
      <Spinner size="x-large" />
    </div>
  );
};

export default Loader;
