import "./spinner.scss";

type Props = {
  size: "x-small" | "small" | "medium" | "large" | "x-large";
};

const Spinner = ({ size }: Props) => {
  return <div className={`spinner-component ${size}`} />;
};

export default Spinner;
