import "./spinner.scss";
export type ISpinnerSize = "x-small" | "small" | "medium" | "large" | "x-large";

type Props = {
  size: ISpinnerSize;
  variant?: "spinner" | "pulse";
};

const Spinner = ({ size, variant }: Props) => {
  return (
    <div
      className={`spinner-component ${size} ${variant ? variant : "spinner"}`}
    >
      {variant === "pulse" ? (
        <>
          <div></div>
          <div></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Spinner;
