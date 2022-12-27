import "./spinner.scss";
export type ISpinnerSize = "x-small" | "small" | "medium" | "large" | "x-large";

type Props = {
  size: ISpinnerSize;
};

const Spinner = ({ size }: Props) => {
  return <div className={`spinner-component ${size}`} />;
};

export default Spinner;
