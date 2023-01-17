import "./spinner.scss";
export type ISpinnerSize = "x-small" | "small" | "medium" | "large" | "x-large";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: ISpinnerSize;
  variant?: "spinner" | "pulse";
}

const Spinner = (props: Props) => {
  const { variant, size, className, ...rest } = props;
  return (
    <div
      {...rest}
      className={`spinner-component ${size} ${variant ? variant : "spinner"}${
        className ? ` ${className}` : ""
      }`}
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
